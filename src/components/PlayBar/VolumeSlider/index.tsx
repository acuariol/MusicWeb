import React from 'react';
import Popover from '@material-ui/core/Popover';
import PopupState, {bindTrigger, bindPopover} from 'material-ui-popup-state';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';

import {IconButton, Slider, makeStyles, createStyles, Typography, Tooltip} from "@material-ui/core";
import {connect} from 'umi';
import {ConnectState, Dispatch} from "@/models/connect";

const useStyles = makeStyles(createStyles({
  vsBox: {
    width: 64,
    height: 240,
    padding: '6px 12px 8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  volumeText: {
    fontWeight: 'bold',
    padding: '6px 0 12px'
  }
}))

interface VolumeSliderProps {
  dispatch: (parse: Dispatch) => void,
  volume: number,
  muted: boolean,
}

function VolumeSlider(props: VolumeSliderProps) {

  const {muted, volume, dispatch} = props

  const handleSliderChangeCommitted = (event: object, value: number | number[]): void => {

  }

  const handleSliderChange = (event: object, value: number | number[]): void => {


    dispatch({
      type: 'play/setState',
      payload: {volume: value}
    })

    if (muted) {
      dispatch({
        type: 'play/setState',
        payload: {muted: false}
      })
    }
  }

  const handleMuted = () => {
    dispatch({
      type: 'play/setState',
      payload: {muted: !muted}
    })
  }

  const classes = useStyles()

  const text = Math.round(volume * 100)

  const Icon = () => {
    if (muted) return <VolumeOffIcon color="inherit" />
    if (text <= 0) return <VolumeMuteIcon color="inherit" />
    if (text <= 50) return <VolumeDownIcon color="inherit" />
    if (text > 30) return <VolumeUpIcon color="inherit" />
    return null
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState: any) => (
        <>
          <IconButton color="inherit" {...bindTrigger(popupState)}>
            <Icon />
          </IconButton>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            elevation={4}
          >
            <div className={classes.vsBox}>
              <Typography className={classes.volumeText}>{text}</Typography>

              <Slider
                step={0.001}
                min={0}
                max={1.000}
                orientation="vertical"
                defaultValue={0.800}
                value={volume}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
              />

              <Tooltip title="切换静音">
                <IconButton color="inherit" style={{marginTop: 8}} onClick={handleMuted}>
                  <Icon />
                </IconButton>

              </Tooltip>


            </div>

          </Popover>
        </>
      )}
    </PopupState>
  );
}

const mapStateToProps = ({play}: ConnectState) => ({
  volume: play.volume,
  muted: play.muted
})


export default connect(mapStateToProps)(VolumeSlider)
