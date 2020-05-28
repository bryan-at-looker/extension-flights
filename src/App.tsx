import React, { useState } from "react"
import { theme, Box, GlobalStyle } from "@looker/components"
import styled, { ThemeProvider } from "styled-components"
import { ExtensionProvider } from "@looker/extension-sdk-react"
import { AppEntry } from "./components/AppEntry"

interface AppProps {
  standalone?: boolean
}

export const App: React.FC<AppProps> = ({ standalone }) => {
  const [pathname, setPathname] = useState("")

  return (
    <ExtensionProvider onPathnameChange={setPathname}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Box width="100%" height="100%">
            <AppEntry pathname={pathname.substring(1)}></AppEntry>
          </Box>
        </>
      </ThemeProvider>
    </ExtensionProvider>
  )
}

export const Layout = styled(Box)`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 200px auto;
  width: 100vw
`
