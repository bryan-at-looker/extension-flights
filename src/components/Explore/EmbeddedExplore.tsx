import React, { useCallback, useContext, useState } from "react"
import { LookerEmbedSDK, LookerEmbedExplore } from '@looker/embed-sdk'

import {
  ExtensionContext,
  ExtensionContextData,
} from "@looker/extension-sdk-react"
import { Button } from "@looker/components"
import styled from 'styled-components'

const DEFAULT_EXPLORE = 'opensky_model/ingest_with_previous_10';

export function EmbeddedExplore ( {query_metadata, setQid, default_slug}: any ) {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext)

  const setupExplore = (explore: LookerEmbedExplore) => {
    // setExplore(explore)
  }

  const stateChanged = (e: any) => {
    const new_url = new URL(e.explore.absoluteUrl)
    const new_qid = new_url.searchParams.get('qid')
    if (new_qid) {
      setQid(new_qid)
    }
  }


  const embedCtrRef = useCallback(el => {
    const hostUrl = extensionContext?.extensionSDK?.lookerHostData?.hostUrl
    if (el && hostUrl) {
      LookerEmbedSDK.init(hostUrl)
      LookerEmbedSDK.createExploreWithId((query_metadata) ? `${query_metadata.model}/${query_metadata.view}` : DEFAULT_EXPLORE)
        .appendTo(el)
        .withParams({qid: (query_metadata) ? query_metadata.client_id : default_slug})
        .on('explore:state:changed', stateChanged)
        .build()
        .connect()
        .then(setupExplore)
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [])

  return (
    <>
      <EmbedContainer ref={embedCtrRef}/>
    </>
  )
}

export const EmbedContainer = styled.div`
  height: 83vh;
  width: 98vw;
  & > iframe {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`