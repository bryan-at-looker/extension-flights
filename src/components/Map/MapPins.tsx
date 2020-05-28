import React, { useState } from 'react';
import {Marker} from 'react-map-gl';
import { Plane } from './Plane';
import { dataAttributes, newPickColor } from '../../helpers';

function Pins({data, pin_size, setHoverData, colors, found, categorical_colors, color_type}:any ) {
  const [clicked, setClicked] = useState<number | undefined>(undefined)

  const measure = data.map((r:any)=>{return r[found['selected_measure']['name']]})
  const data_attributes = dataAttributes(measure)

  const setClick = (row: any, index: number) => {
    if (!clicked) {
      setHoverData({row})
      setClicked(index)
    } else {
      if (clicked != index) {
        setHoverData({row})
        setClicked(index)    
      } else {
        setHoverData({})
        setClicked(undefined)
      }
    }
  }

  const selected_measure = found['selected_measure']['name']
  const latitude_field = found['latitude_field']['name']
  const longitude_field = found['longitude_field']['name']
  const angle_field = found['angle_field']['name']

  return data.map((row: any, index: number) => {
    const color = getColor(data_attributes, row[selected_measure], color_type, categorical_colors, colors)
    return (
      <Marker key={`marker-${index}`} longitude={row[longitude_field]} latitude={row[latitude_field]}>
      <Plane         index={index}
        clicked={clicked}
        setClick={setClick}
        row={row}
        pin_size={pin_size}
        setHoverData={setHoverData}
        angle={row[angle_field]}
        color={color}
      ></Plane>
    </Marker>
    )
  });
}

export const MapPins = React.memo(Pins);
// Important for perf: the markers never change, avoid rerender when the map viewport changes

// color={pickHex([0,0,0],[255,255,255],((row[selected_measure]-min_value)/range))}

function getColor(data_attributes, value, color_type, categorical_colors, colors) {
  if (color_type === "number") {
    const [min,max,range] = data_attributes
    return `rgb(${newPickColor(colors,(value-min)/range).join(',')})`
  } else {
    return `rgb(${categorical_colors[value].join(',')})`;
  }
}