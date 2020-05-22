import React from 'react'
import {makeStyles} from '@material-ui/core'
import {history} from 'umi'

const useStyles = makeStyles(theme => {
  // console.log(theme)
  return {
    font: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      fontSize: '2.3rem',

    },
    logo: {
      // backgroundColor:'#000',
      // padding:'20px 0',
      display: 'flex',
      alignItems: 'center',
      marginRight: 'auto',
      cursor: 'pointer',
    }
  }
})

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.logo} onClick={() => history.replace('/')}>
      <h1 className={classes.font}>
        Beatz
      </h1>
    </div>
  )
}
