import React, {useState, useEffect} from 'react';
import ReactMapGL, { WebMercatorViewport, FlyToInterpolator } from 'react-map-gl';
import { MapPins } from './MapPins';
import { find, sortBy } from 'lodash'
import { newPickColor } from '../../helpers';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYnJ5YW4tYXQtbG9va2VyIiwiYSI6ImNqczZ0N2k2czBwdXM0NG1zejVpN3VpczgifQ.VCz4Heo3BVl1QvVxPUy10g'; // Set your mapbox token here
const PADDING = 30;
const TRASITION_DURATION = 1000;

export function MapEntry({ data, ...props }: any) {
  const colors = [props.color1, props.color2, props.color3]

  var found: any = {}

  const check_props = ['latitude_field', 'longitude_field', 'angle_field', 'selected_measure'];
  check_props.forEach(p=>{
    if (props[p] && data.length) {
      found[p] = find(props.all_fields, { name: props[p] })
      if (found[p]) {
        found[p]['_name'] = (data[0][found[p]['name']]) ? props[p] : props[p].replace('.','_')
        props[p] = (data[0][found[p]['name']]) ? props[p] : props[p].replace('.','_')
      }
    }
  })


  const selected = found['selected_measore']
  var color_type: string;
  var categorical_colors: any;
  if ( selected && (selected._type_hint === 'number' || selected.type === 'number')  ) {
    color_type = "number"
  } else {
    color_type = "categorical"
    categorical_colors = getCategoricalColors (data, found['selected_measure']['name'], colors)
  }

  const [viewport, setViewport] = useState<any>({
    latitude: data[0][props.latitude_field],
    longitude: data[0][props.longitude_field],
    zoom: 8
  });
  // bounds == [ [X1,Y1], [X2,Y2] ]
  const [bounds, setBounds] = useState<any | undefined>(undefined)

  useEffect(()=>{
    if (data) { fitBounds() }
  }, [data])

  useEffect(()=>{
    if (bounds) { fitViewport() }
  }, [bounds])

  const fitBounds = () => {
    const grid_data: any = data.map((row: any)=>{
      return [ row[props.longitude_field], row[props.latitude_field] ]
    })

    var sw: any = (bounds) ? bounds[0] : [ grid_data[0][0], grid_data[0][1] ]
    var ne: any = (bounds) ? bounds[1] : [ grid_data[0][0], grid_data[0][1] ]

    grid_data.forEach((row: any, i: number)=>{
      sw[0] = (row[0] < sw[0]) ? row[0] : sw[0]
      sw[1] = (row[1] < sw[1]) ? row[1] : sw[1]
      ne[0] = (row[0] > ne[0]) ? row[0] : ne[0]
      ne[1] = (row[1] > ne[1]) ? row[1] : ne[1]  
    })

    setBounds([sw,ne]);
  }

  const fitViewport = () => {
    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds(bounds, { padding: PADDING });
    const new_viewport = {
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: TRASITION_DURATION,
      transitionInterpolator: new FlyToInterpolator()
    }
    setViewport(new_viewport)
  }


  return (
    <>
      <ReactMapGL
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        onViewportChange={(vp: any) => setViewport(vp)}
      >
        {data && <MapPins
          colors={colors}
          categorical_colors={categorical_colors}
          color_type={color_type}
          {...props}
          data={data}
          found={found}
          setHoverData={props.setHoverData}
        ></MapPins>}
      </ReactMapGL>
    </>
  );
}


function getCategoricalColors (data: any, field: string, colors: any) {
  var categorical_colors: any = {}
  const measure = sortBy(data.map((r: any)=>{return r[field]}))
  let unique = Array.from(new Set(measure))
  const colors_len = unique.length-1
  unique.forEach((u,i)=>{
    categorical_colors[u] = newPickColor(colors,i/colors_len)
  })
  return categorical_colors
}