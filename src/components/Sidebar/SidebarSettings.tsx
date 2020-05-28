import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Slider, Heading, Select, FlexItem, Flex, Radio, ToggleSwitch } from '@looker/components';
import styled from 'styled-components'
import {theme} from '@looker/components'
import { Settings } from '../AppEntry';
import { find, filter } from 'lodash'
import { SidebarColor } from './SidebarColor';


export function SidebarSettings({ 
  selected_measure,
  latitude_field,
  longitude_field,
  angle_field,
  pin_size,
  all_settings,
  setSettings,
  query_metadata,
  explore_metadata,
  all_fields,
  color1,
  color2,
  color3,
  show_hover
}:any) {
  const [fade, setFade] = useState(false)
  const settingsUpdate = (setting: string, val: number) => {
    setSettings({...all_settings, [setting]: val})
  }

  const select_all = query_metadata.fields.map((name: string)=>{
    const found = find(all_fields, {name: name})
    if (found) {
      return { label: found.label_short || found.label, value: name, type: found.type}
    } else {
      return {}
    }
  })

  const handleFade = (e: any) => {
    if (fade) {
      setFade(false)
    } else {
      setFade(true)
    }
  }

  return (
    <>
      <Heading mt="small">Show Details:</Heading>
      <ToggleSwitch on={show_hover} onChange={(e: any)=>settingsUpdate('show_hover',e.target.checked)}></ToggleSwitch>
      <Heading mt="small">Select Color:</Heading>
      <Flex justifyContent="space-evenly">
        <FlexItem pr="xsmall" width="33%" textAlign="center" maxWidth="105px">
          <SidebarColor
            settingsUpdate={settingsUpdate}
            setting='color1'
            rgb={color1}
          />
        </FlexItem>
        <FlexItem pr="xsmall" pl="xsmall" width="33%" maxWidth="105px">
          <SidebarColor
            settingsUpdate={settingsUpdate}
            setting='color2'
            rgb={color2}
          />
        </FlexItem>
        <FlexItem pl="xsmall" width="33%" maxWidth="105px">
          <SidebarColor
            settingsUpdate={settingsUpdate}
            setting='color3'
            rgb={color3}
          />
        </FlexItem>
      </Flex>
      <Heading  mt="small">Color By:</Heading>
        <Select
          value={selected_measure}
          onChange={(e: any)=>{settingsUpdate('selected_measure',e)}}
          options={select_all}
          mr="small"
        />
      <Heading  mt="small">Rotate Icons:</Heading>
      <Select
        value={angle_field}
        onChange={(e: any)=>{settingsUpdate('angle_field',e)}}
        options={filter(select_all, {type: 'number'})}
        mr="small"
      />
      <Heading mt="small">Show Details:</Heading>
      <ToggleSwitch on={fade} onChange={handleFade}></ToggleSwitch>
      { fade && <Select
        value={angle_field}
        onChange={(e: any)=>{settingsUpdate('angle_field',e)}}
        options={filter(select_all, {type: 'number'})}
        mr="small"
      /> }
      <Heading mt="small">Marker Size:</Heading>
      <Slider 
        min={2} 
        max={40} 
        value={pin_size} 
        onChange={(e: any)=>settingsUpdate('pin_size',e.target.value)}
      />
    </>
  );
}