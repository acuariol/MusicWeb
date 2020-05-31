import React from "react";
import {connect} from 'umi';
import {createStyles, IconButton, Typography, withStyles} from "@material-ui/core";
import {ConnectState, Dispatch} from "@/models/connect";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Skip from '@/components/Skip'
import {formatMilliSeconds} from '@/utils/utils';
import ProgressTime from '../ProgressTime';


import PlaySlider from '../PlaySlider'
import VolumeSlider from "../VolumeSlider";

const styles = () => createStyles({
  root: {
    width: 640,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
    paddingRight: 16
  },
  playTime: {
    padding: '0 12px'
  },
  icon: {
    color: '#fff'
  }
});


interface ControlProps {
  classes: { [propsName: string]: string },
  dispatch: (parse: Dispatch) => void,
  url: string,
  playing: boolean,
  playTime: number
}

class Control extends React.PureComponent<ControlProps> {


  togglePlaying = () => {
    const {playing, dispatch, url} = this.props

    if (!url) return
    dispatch({
      type: 'play/setState',
      payload: {playing: !playing}
    })
  }



  render() {
    const {classes, playing, playTime} = this.props;

    const time = formatMilliSeconds(playTime)

    return (
      <div className={classes.root}>

        <Skip type="prev" >
          <SkipPreviousIcon className={classes.icon} />
        </Skip>

        <IconButton onClick={this.togglePlaying}>
          {
            playing ? <PauseIcon fontSize="large" color="primary" /> :
              <PlayArrowIcon fontSize="large" color="primary" />
          }
        </IconButton>

        <Skip type="next">
          <SkipNextIcon className={classes.icon} />
        </Skip>


        <div style={{padding: '0 24px', flex: 1}}>
          <PlaySlider />
        </div>

        <Typography className={classes.playTime}><ProgressTime />/{time}</Typography>
        <VolumeSlider />

      </div>
    )
  }
}

const mapStateToProps = ({play}: ConnectState) => ({
  url: play.url,
  playing: play.playing,
  playTime: play.playTime
})

const Con = withStyles(styles)(Control)
// @ts-ignore
export default connect(mapStateToProps)(Con)
