import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Flex, Box, FlexItem } from '@looker/components';
import styled from 'styled-components'
import { dataAttributes, localeFormatter } from '../../helpers';
import { FlexProps } from 'styled-system';

export function NumberLegend( {data, selected_measure, colors}: any ) {

  if (!data[0][selected_measure]) {
    selected_measure = selected_measure.replace('.','_')
  }

  
  const measure = data.map((r: any)=>{return r[selected_measure]})
  const [min, max, range] = dataAttributes(measure)

  return (
    <StyledFlex1
      flexDirection="column"
      id="kewl"
      mb="large"
      ml="large"
    >
      <FlexItem>
        <Flex 
          justifyContent="space-between"
          ml="large"
        >
          <FlexItem>{localeFormatter(min, 'en-US', 'decimal', 4)}</FlexItem>
          <FlexItem>{localeFormatter(max, 'en-US', 'decimal', 4)}</FlexItem>
        </Flex>
      </FlexItem>
      <FlexItem>
        <StyledFlex2 
          color1={colors[0]}
          color2={colors[1]}
          color3={colors[2]}
          ml="large"
          mb="large"
        ></StyledFlex2>   
      </FlexItem>
    </StyledFlex1>

  );
}

const StyledFlex1 = styled(Flex)`
position: fixed;
bottom: 0;
left: 0;
`
interface StyledFlex2Props extends FlexProps {
  color1: any
  color2: any
  color3: any
}

const StyledFlex2: StyledFlex2Props = styled(Flex)`
  width: 25vw;
  height: 25px;
  background-image: linear-gradient(to right, rgb(${(props) => { return props.color1.join(',') } }), rgb(${(props) => { return props.color2.join(',') } }), rgb(${(props) => { return props.color3.join(',') } }) );
`

// background-image: linear-gradient(to right, ${rgbToHex([255,255,255])}, ${rgbToHex([0,0,0])});