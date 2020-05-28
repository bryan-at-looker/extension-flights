

import React, { useState } from 'react';
// import { Tooltip } from '@looker/components';
import styled from 'styled-components';
import Tooltip from 'react-tooltip-lite';
export function Plane( {row, angle, color, setHoverData, index, clicked, setClick, pin_size}: any) {
  const [is_hovered, setIsHovered] = useState(false)
  // const [is_clicked, setIsClicked] = useState(false)

  const hoverIn = () => {
    if (!clicked) {
      setHoverData({row})
      setIsHovered(true)
    }
  }

  const hoverOut = () => {
    if (!clicked) {
      setHoverData({})
      setIsHovered(false)
    }
  }

  return (
    <svg
      height={`${pin_size}px`}
      width={`${pin_size}px`}
      onClick={()=>{setClick(row, index)}}
      onMouseOver={hoverIn}
      onMouseOut={hoverOut}
      style={{
        cursor: 'pointer',
        fill: color,
        boxShadow: (clicked && clicked==index) ? "0 0 20px black": '',
        transform: (angle)? `rotate(${angle}deg)` : ''
      }}
      version="1.1" x="0px" y="0px" viewBox="0 0 426.667 426.667"  xmlSpace="preserve">
      <g>
        <g>
          <path d="M416,298.667V256L245.333,149.333V32c0-17.707-14.293-32-32-32s-32,14.293-32,32v117.333L10.667,256v42.667    l170.667-53.333v117.333l-42.667,32v32l74.667-21.333L288,426.667v-32l-42.667-32V245.333L416,298.667z"/>
        </g>
      </g>
    </svg>
  );
}

const StyledToolTip = styled(Tooltip)`
  display: flex;
  background-color: blue;
  & > div > div 
  & > div > div > p {
    width: 100px !important;
  }
`
