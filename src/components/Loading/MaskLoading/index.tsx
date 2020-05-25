import React from 'react'
import {makeStyles, createStyles,  CircularProgress} from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    display:'flex'
  },
  loading: {
    margin:'84px auto 0'
  }
}))

const MaskLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.loading} />
    </div>
  )
}


export default MaskLoading
