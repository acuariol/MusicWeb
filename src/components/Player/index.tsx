import * as React from 'react';
import {createStyles, withStyles} from '@material-ui/core'
import {connect} from 'umi'
import ReactPlayer from "react-player";
import {ConnectState, Dispatch} from "@/models/connect";

const styles = () => createStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    // zIndex: -1
  }
})


type Props = {
  classes: any,
  url?: string,
  dispatch: (parse: Dispatch) => void,
  [propsName: string]: any
};
type State = {};

const mapStateToProps = ({mv}: ConnectState) => ({
  url: mv.url,
  playing: mv.playing
})


// @ts-ignore
@connect(mapStateToProps)
class Player extends React.PureComponent<Props, State> {

  setPlayState = (payload: any) => {
    const {dispatch} = this.props
    dispatch({
      type: 'mv/setState',
      payload
    })
  }

  onReady = () => {
    this.setPlayState({playing: true})
  }

  onStart = () => {

  }

  onError = () => {

  }

  onPause = () => {
    this.setPlayState({playing: false})
  }

  onPlay = () => {
    const {dispatch} = this.props
    dispatch({
      type: 'play/setState',
      payload: {playing: false}
    })

    // this.setPlayState({playing: true})
  }

  // onProgress = (state: any) => {
  //   this.setPlayState(state)
  // }

  render() {

    const {classes, url, playing} = this.props
    return (
      <div className={classes.root}>
        <ReactPlayer
          url={url}
          key="player"
          width="100%"
          height="100%"

          controls
          playing={playing}
          onReady={this.onReady}
          onStart={this.onStart}
          onError={this.onError}
          onPause={this.onPause}
          onPlay={this.onPlay}

        />
      </div>
    );
  };
}


export default withStyles(styles)(Player)
