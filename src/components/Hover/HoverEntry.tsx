import React from 'react';
import { Text } from '@looker/components';
import styled from 'styled-components'

export function HoverEntry({...props}: any) {

  if (Object.keys(props).length) {}
  return (
    <StyledText 
      m="large"
      fontSize="xsmall"
    >
      {JSON.stringify(props, null, 2)}
    </StyledText>
  );
}

const StyledText = styled(Text)`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50vh;
  width: 35vw;
  white-space: pre;
`