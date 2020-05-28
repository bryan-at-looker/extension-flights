import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Flex, Box, FlexItem } from '@looker/components';
import styled from 'styled-components'
import { dataAttributes, localeFormatter } from '../../helpers';
import { FlexProps } from 'styled-system';
import { NumberLegend } from './NumberLegend';
import { find } from 'lodash'
import { CategoricalLegend } from './CategoricalLegend';

export function LegendEntry( {all_fields, ...props}: any ) {
  const found = find(all_fields, {name: props.selected_measure})
  // if (found?._type === 'dynamic_field') {
    
  // }
  if (found) {
    if ( found._type_hint  === 'number'  || found.type === 'number' ) {
      return (
        <NumberLegend
          {...props}
        ></NumberLegend>
      )
    } else {
      return <CategoricalLegend
        {...props}
      ></CategoricalLegend>;
    }
  } else {
    return <></>;
  }


}