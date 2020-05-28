import React, { useState, useEffect, useContext } from 'react';
import { ExtensionContextData, ExtensionContext } from '@looker/extension-sdk-react';
import { Code, Drawer, Button, ModalContent, Paragraph, ModalFooter, Heading, ButtonOutline } from '@looker/components';
import styled from 'styled-components'
import { SidebarSettings } from './SidebarSettings';

export function SidebarEntry({settings, setSettings, query_metadata, explore_metadata, all_fields, setExploreOpen}: any) {
  const [drawer, setDrawer] = useState(false);

  useEffect(()=>{
  },[])


  return (
<>
    <Drawer 
      isOpen={drawer} 
      onClose={()=>setDrawer(false)}
    >
      <ModalContent>
        <SidebarSettings 
          all_fields={all_fields}
          explore_metadata={explore_metadata}
          query_metadata={query_metadata}
          {...settings}
          all_settings={settings}
          setSettings={setSettings}
        ></SidebarSettings>
      </ModalContent>
      <ModalFooter>
        <Button onClick={()=>setDrawer(!drawer)}>Finished</Button>
        <ButtonOutline onClick={()=>setExploreOpen(true)}>Edit Query</ButtonOutline>
      </ModalFooter>
    </Drawer>
    <StyledButton 
      m="large"
      onClick={()=>setDrawer(!drawer)}
    >Info</StyledButton>
    </>
  );
}

const StyledButton = styled(Button)`
position: fixed;
top: 0;
right: 0;
`