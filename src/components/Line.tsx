import React from 'react'
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: 30,
    height: 4
  }
}))
export default () => {
  const classes = useStyles()
  return (<span className={classes.root} />)
}
