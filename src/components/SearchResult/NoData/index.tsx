import React from 'react'
import {createStyles, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => createStyles({
  root: {
    padding: '64px 0'
  }
}))
export default () => {
  const classes = useStyles()
  return (
    <Typography variant="h5" className={classes.root} align="center">
      未能找到相关搜索结果🙃
    </Typography>
  )
}
