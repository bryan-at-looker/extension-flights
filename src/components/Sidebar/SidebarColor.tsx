import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { ColorWheel, LuminositySlider } from '@looker/components';
import styled from 'styled-components'
import { HSVtoRGB, rgbToHsv } from '../../helpers';

export function SidebarColor( {settingsUpdate, setting, rgb}) {
  
  const [color, setColor] = useState(
    rgbToHsv(rgb) || {
    h: 140,
    s: 0.5,
    v: 0.5,
  })

  const handleColorStateChange = (hs: any) => {
    setColor({
      ...hs,
      v: color.v,
    })
  }

  const handleSliderChange = (event: any) => {
    const value = Number(event.currentTarget.value)
    setColor({ ...color, v: value / 100 })
  }

  useEffect(()=>{
    settingsUpdate(setting, HSVtoRGB(color))
  }, [color])

  return (
    <>
      <StyledColorWheel
        hue={color.h}
        saturation={color.s}
        value={color.v}
        onColorChange={handleColorStateChange}
      />

      <LuminositySlider
        id="typeinp"
        min={0}
        max={100}
        value={color.v * 100}
        onChange={handleSliderChange}
        step={1}
      />
    </>
  );
}

const StyledColorWheel = styled(ColorWheel)`
  div {
    display: none;
  }
`