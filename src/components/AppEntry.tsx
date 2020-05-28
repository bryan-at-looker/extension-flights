import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { MapEntry } from './Map/MapEntry';
import { HoverEntry } from './Hover/HoverEntry';
import { SidebarEntry } from './Sidebar/SidebarEntry';
import { LegendEntry } from './Legend/LegendEntry';
import { ExploreEntry } from './Explore/ExploreEntry';

const SLUG = 'N6BfdSB0TmxNO3uwaL9VLk';
const ANGLE_FIELD = 'ingest_with_previous_10.true_track'
const LATITUDE_FIELD = 'location.latitude'
const LONGITUDE_FIELD = 'location.longitude'
const MEASURE = 'ingest_with_previous_10__previous_10_fields.geo_ascending_or_descending'
// const MEASURE = 'average_of_geo_altitude'
const PIN_SIZE = 20
const COLOR1 = [255,255,0];
const COLOR2 = [0,255,0];
const COLOR3 = [0,0,255];
const SHOW_HOVER = true;

export interface Settings {
  selected_measure: string;
  latitude_field: string;
  longitude_field: string;
  angle_field: string;
  pin_size: number;
  color1: any;
  color2: any;
  color3: any;
  show_hover: boolean;
}

const DEFAULT_SETTINGS = {
  selected_measure: MEASURE,
  latitude_field: LATITUDE_FIELD,
  longitude_field: LONGITUDE_FIELD,
  angle_field: ANGLE_FIELD,
  pin_size: PIN_SIZE,
  color1: COLOR1,
  color2: COLOR2,
  color3: COLOR3,
  show_hover: SHOW_HOVER
}

const DEFAULT_QUERY = {
  "model": "opensky_model",
  "view": "ingest_with_previous_10",
  "fields": [
      "location.latitude",
      "location.longitude",
      "ingest_with_previous_10.true_track",
      "ingest_with_previous_10__previous_10_fields.geo_ascending_or_descending",
      "ingest_with_previous_10.geo_altitude",
      "ingest_with_previous_10__previous_10_fields.slope_velocity",
      "ingest_with_previous_10__previous_10_fields.average_velocity",
      "ingest_with_previous_10__previous_10_fields.slope_vertical_rate",
      "ingest_with_previous_10.icao24",
      "ingest_with_previous_10.on_ground"
  ],
  "filters": {
      "ingest_with_previous_10.time_position_time": "60 minutes",
      "master.name": "UNITED AIRLINES INC"
  }
}

export function AppEntry({pathname}: any) {
  const [data, setData] = useState<any>(undefined);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [query_metadata, setQueryMetadata] = useState<any>(undefined)
  const [default_slug, setDefaultSlug] = useState<any>(undefined)
  const [explore_metadata, setExploreMetadata] = useState<any>(undefined)
  const [all_fields, setAllFields] = useState<any>(undefined)
  const [hover_data, setHoverData] = useState<any>(undefined)
  const [explore_open, setExploreOpen] = useState(false);
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(() => {
    getDefaultSlug();
  }, [])

  useEffect(() => {

  }, [explore_open])

  useEffect(()=>{
    if (pathname !== '') {
      resetApp();
      apiCall();
    } else {
      setExploreOpen(true)
    }
  },[pathname])

  useEffect(()=>{
    if (query_metadata) {
      getExploreMetadata()
    }
  },[query_metadata])

  const getDefaultSlug = async () =>{
    const def_q = await sdk.ok(sdk.create_query(DEFAULT_QUERY))
    setDefaultSlug(def_q.client_id)
  }

  const resetApp = () => {
    setData(undefined);
    // setSettings(DEFAULT_SETTINGS);
  }

  const getExploreMetadata = async () => {
    const explore = await sdk.ok(sdk.lookml_model_explore(query_metadata.model, query_metadata.view));
    setExploreMetadata(explore);
    // @ts-ignore
    const {dimensions, measures} = explore.fields
    const dynamic_fields = JSON.parse(query_metadata.dynamic_fields || '[]').map((f:any)=>{
      return {...f, name: f['measure'] || f['dimension'], '_type': 'dynamic_field' }
    })
    const all_fields = dimensions.concat(measures, dynamic_fields);
    setAllFields(all_fields)
  }

  const apiCall = async () => {
    setExploreOpen(false)
    const query = await sdk.ok(sdk.query_for_slug(pathname))
    setQueryMetadata(query)
    const results = await sdk.ok(sdk.get(`/queries/${query.id}/download/json?limit=-1`))
    setData(results)
  }

  if (data) {
    return (
    <>    
      <MapEntry
        data={data}
        {...settings}
        setHoverData={setHoverData}
        all_fields={all_fields}
      ></MapEntry>
      { settings.show_hover && <HoverEntry hover_data={hover_data}></HoverEntry> }
      <LegendEntry
        colors={[settings.color1, settings.color2, settings.color3]}
        data={data} 
        selected_measure={settings.selected_measure}
        all_fields={all_fields}
      ></LegendEntry>
      { all_fields && <SidebarEntry 
        settings={settings} 
        setSettings={setSettings}
        query_metadata={query_metadata}
        explore_metadata={explore_metadata}
        all_fields={all_fields}
        setExploreOpen={setExploreOpen}
      ></SidebarEntry> }
        { explore_open && <>
        <ExploreEntry query_metadata={query_metadata} setExploreOpen={setExploreOpen}></ExploreEntry>
      </>}
    </>
    );
  } else {
    return <>
      { explore_open && default_slug && <>
        <ExploreEntry {...{query_metadata, setExploreOpen, default_slug}}></ExploreEntry>
      </>}
    </>;
  }

}