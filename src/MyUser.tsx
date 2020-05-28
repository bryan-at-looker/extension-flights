import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code } from '@looker/components';
import styled from 'styled-components'
import { EmbedExplore } from './components/Embed/EmbedExplore'

export function MyUser() {
  const [me, setMe] = useState<any>(undefined);
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)
  const sdk = extensionContext.coreSDK

  useEffect(()=>{
    apiCall();
  },[])

  const apiCall = async () => {
    const me = await sdk.ok(sdk.create_query({
            model: 'thelook-snowflake',
            view: 'order_items',
            fields: ['order_items.total_sale_price'],
            filters: {'order_items.created_date': '30 days'}
    }))
    setMe(me)
  }

  if (me) {
    return (
        <EmbedExplore qid={me.client_id}></EmbedExplore>
      );
  } else {
      return <></>
  }

}
