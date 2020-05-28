import React from 'react';
import { Flex, Swatch, FlexItem, Label } from '@looker/components';
import styled from 'styled-components'
import { sortBy } from 'lodash'
import { newPickColor } from '../../helpers';

export function CategoricalLegend( {data, selected_measure, colors}: any) {

  if (!data[0][selected_measure]) {
    selected_measure = selected_measure.replace('.','_')
  }
  const measure = sortBy(data.map((r: any)=>{return r[selected_measure]}))
  let unique = Array.from(new Set(measure))
  const colors_len = unique.length-1
  
  const items = unique.map((m:string, i:number)=>{
    const color = newPickColor(colors, i/colors_len)
    return <FlexItem 
      mt="xxsmall"
      key={m}
      verticalAlign="middle"
      >
        <Swatch
          width="24px" height="24px"
          color={`rgb(${color.join(',')})`}
          style={{float: 'left'}}
        />
        <Label 
          ml="small"
          fontSize="small"
        >{m}</Label>
    </FlexItem>
  })
  
  return (
    <StyledFlex1
      flexDirection="column"
      mb="xlarge"
      ml="xlarge"
    >
      {items}
    </StyledFlex1>
  );
}

const StyledFlex1 = styled(Flex)`
position: fixed;
bottom: 0;
left: 0;
`