import React from 'react'
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import cls from 'classnames'

const useStyles = makeStyles((theme: Theme) => createStyles({
  musicLoading: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
  },
  bar: {
    height: 30,
    width: 4,
    backgroundColor: '#fff',
    display: 'inline-block',
    transformOrigin: 'center center',
    borderRadius: 2,
    margin: '0 2px',
    animation: '$musicLoading 2.5s ease-in-out infinite',
  },
  bar1: {
    animationDelay: '0.1s',
  },
  bar2: {
    animationDelay: '0.25s',
  },
  bar3: {
    animationDelay: '0.4s',
  },
  bar4: {
    animationDelay: '0.55s',
  },
  '@keyframes musicLoading': {
    '0%': {
      transform: 'scaleY(0.1)',
      backgroundColor: 'white',
    },
    '50%': {
      transform: 'scaleY(1)',
      backgroundColor: theme.palette.primary.main
    },
    '100%': {
      transform: 'scaleY(0.1)',
      backgroundColor: 'white',
    }
  },
}))
const MusicLoading = () => {
  const classes = useStyles()

  return (
    <div className={classes.musicLoading}>
      <div className={cls(classes.bar, classes.bar1)} />
      <div className={cls(classes.bar, classes.bar2)} />
      <div className={cls(classes.bar, classes.bar3)} />
      <div className={cls(classes.bar, classes.bar4)} />
    </div>
  )
}




export {MusicLoading}
