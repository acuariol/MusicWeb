import React from 'react'
import {Container, createMuiTheme, CssBaseline, ThemeProvider} from '@material-ui/core';
import SpeedDials from '@/components/SpeedDials'
import PlayBar from '@/components/PlayBar';
import Footer from '@/components/Footer';
import Broadcast from '@/components/Broadcast'
import HistoryDrawer from '@/components/HistoryDrawer'
import classes from './styles.less'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#9C27B0'
    },
    secondary: {
      main: '#F15024'
    }
  },
});


interface SimpleLayoutProps {
  children?: React.ReactNode
}

const SimpleLayout = ({children}: SimpleLayoutProps) => {

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <PlayBar />
        <Broadcast />
        <div className={classes.content}>
          <Container>
            {children}
          </Container>
        </div>
        <SpeedDials />
        <Footer />
        <HistoryDrawer />
      </ThemeProvider>
    </>
  )
}

export default SimpleLayout

