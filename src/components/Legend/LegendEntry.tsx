import React from 'react';
import { NumberLegend } from './NumberLegend';
import { find } from 'lodash'
import { CategoricalLegend } from './CategoricalLegend';

export function LegendEntry( {all_fields, ...props}: any ) {
  const found = find(all_fields, {name: props.selected_measure})

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