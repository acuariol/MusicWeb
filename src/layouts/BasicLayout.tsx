import React from 'react'
import {createMuiTheme, CssBaseline, makeStyles, ThemeProvider, Container,createStyles} from '@material-ui/core';
import Slider from '@/components/Slider';
import PlayBar from '@/components/PlayBar';

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

const useStyles = makeStyles((theme)=>{
  console.log(theme)

  return createStyles({
    siteLeft: {
      backgroundColor: '#252525',
      width: 300,
      flex: 'none',
      boxSizing: 'border-box',
      position: 'relative',

    },
    siteRight: {
      // backgroundColor: '#fff',
      boxSizing: 'border-box',
      flex: 'auto',
      position: 'relative'
    }
  })
});

interface BasicLayoutProps {
  children: any
}

const BasicLayout = ({children}: BasicLayoutProps) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className={classes.siteLeft}>
          <Slider />
        </div>
        <div className={classes.siteRight}>
          <PlayBar />
          <div style={{width: '100%', height: 'auto', padding: '40px 0',position:'relative'}}>
            <Container>
              {children}
            </Container>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default BasicLayout

