
import '@babel/polyfill'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/fonts.css'
import Layout from './components/layout'

import { GlobalContextProvider } from './context/global-context.jsx'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1DB954',
      light: '#1DB954',
      dark: '#1DB954'
    },
    secondary: {
      main: '#000000',
      light: '#000000',
      dark: '#000000'
    },
    type: 'light'
  },
  typography: {
    fontFamily: 'GothamRoundBold',
    useNextVariants: true
  }
})

class Application extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <GlobalContextProvider>
        <MuiThemeProvider theme={theme}>
          <Router>
            <Layout />
          </Router>
        </MuiThemeProvider>
        <CssBaseline />
      </GlobalContextProvider>
    )
  }
}

ReactDom.render(<Application />, document.getElementById('spotificatr-application'))
