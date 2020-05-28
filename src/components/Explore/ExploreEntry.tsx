import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Dialog, ModalContent, Paragraph, Button, MenuList, MenuItem, Heading, ModalHeader, ModalFooter, Box, ButtonOutline, Flex, FlexItem } from '@looker/components';
import styled from 'styled-components'
import { EmbeddedExplore } from './EmbeddedExplore';
import { Link } from "react-router-dom"


export function ExploreEntry ( {query_metadata, setExploreOpen, default_slug}: any) {
  const [qid, setQid] = useState<string | undefined>(undefined)
  useEffect(()=>{
    
  },[])

  const saveExploreModal = () => {
    setExploreOpen(false)
  }

  const closeExploreModal = () => {
    setExploreOpen(false)
  }

  return (
    <>
      <Dialog 
        isOpen={true} 
        maxWidth="98vw"
        onClose={() => setExploreOpen(false)}>
          <Flex flexDirection="column">
            <FlexItem>
              <EmbeddedExplore {...{query_metadata, setQid, default_slug}} ></EmbeddedExplore>
            </FlexItem>
            <FlexItem mb="xxsmall" textAlign="right">
              <ButtonOutline  mr="small" onClick={closeExploreModal} >Cancel</ButtonOutline>
              <Link to={`/${qid}`}><Button  mr="small" onClick={saveExploreModal}>Save</Button></Link>
            </FlexItem>
          </Flex>
      </Dialog>
    </>
  );
}