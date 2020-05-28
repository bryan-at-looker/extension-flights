/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import { Sidebar } from "./components/Sidebar"
import { CoreSDKFunctions } from "./components/CoreSDKFunctions"
import { ApiFunctions } from "./components/ApiFunctions"
import React, { useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { theme, Box, GlobalStyle } from "@looker/components"
import styled, { ThemeProvider } from "styled-components"
import { ExtensionProvider } from "@looker/extension-sdk-react"
import { EmbedDashboard } from "./components/Embed"
import { EmbedExplore } from "./components/Embed/EmbedExplore"
import { EmbedLook } from "./components/Embed/EmbedLook"
import { MyUser } from "./MyUser"
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
