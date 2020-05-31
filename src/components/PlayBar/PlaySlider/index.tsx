import React from 'react'
import {withStyles, Slider, createStyles, Theme} from "@material-ui/core";
import {connect} from 'umi';
import {ConnectState, Dispatch} from "@/models/connect";
import ReactPlayer from "react-player";


const PlaySlider = withStyles(createStyles((theme: Theme) => ({
  root: {
    color: theme.palette.primary.main,
    height: 6,
  },
  thumb: {
    display: 'none',
    backgroundColor: '#fff',
    height: 16,
    width: 16,
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -8,
    transition: 'all 0s ease-in',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  rail: {
    height: 6,
    borderRadius: 3,
  },
})))(Slider);


interface HocSliderProps {
  dispatch: (parse: Dispatch) => void,
  played: number,
  url: string,
  playing: boolean,
  volume: number,
  muted: boolean,

  [propsName: string]: any
}

class HocSlider extends React.PureComponent<HocSliderProps> {

  playRef: any;

  state: {
    seeking: boolean
  }

  constructor(props: any) {
    super(props);

    this.playRef = React.createRef();
    this.state = {
      seeking: false
    }
  }


  setPlayState = (payload: any) => {
    const {dispatch} = this.props
    dispatch({
      type: 'play/setState',
      payload
    })
  }

  onReady = () => {
    console.log('onReady')

    this.setPlayState({playing: true})

  }


  onStart = () => {
    console.log('onStart')
  }

  onPlay = () => {
    // this.setPlayState({playing: true})

    const {dispatch} = this.props
    dispatch({
      type: 'mv/setState',
      payload: {playing: false}
    })
  }

  onError = (e: any) => {
    this.setPlayState({playing: false})
    // 提示播放出错 一般是url 403 或''
    console.log('onError')
    console.log(e)
  }

  onPause = () => {
    console.log('onPause')
    this.setPlayState({playing: false})
  }

  onProgress = (state: any) => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking)
      this.setPlayState(state)

  }

  onEnded = () => {
    const {dispatch} = this.props
    dispatch({
      type: 'play/skip',
      payload: {type: 'next'}
    })

  }

  onDuration = (duration: any) => {
    this.setPlayState({playTime: duration * 1000})

    console.log('onDuration', duration)
    // this.setState({ duration })
  }

  handleSliderChangeCommitted = (event: object, value: number | number[]): void => {
    const {url} = this.props;
    if (!url) return

    // console.log('handleSliderChangeCommitted')
    // console.log(value)
    this.setState({seeking: false})

    if (this.playRef.current) {
      this.playRef.current.seekTo(value)
    }

    // console.log(this.playRef.current)
  }

  handleSliderChange = (event: object, value: number | number[]): void => {
    const {url,} = this.props;
    if (!url) return
    if (!this.state.seeking)
      this.setState({seeking: true})

    this.setPlayState({played: value})
    // console.log('handleSliderChange')
    // console.log(value)
  }

  render() {
    const {played, url, playing, volume, muted} = this.props;
    return (
      <>
        <PlaySlider
          valueLabelDisplay="off"
          defaultValue={0}
          min={0}
          max={0.999999}
          step={0.01}
          value={played}
          onChange={this.handleSliderChange}
          onChangeCommitted={this.handleSliderChangeCommitted}
          key="music"
        />

        <ReactPlayer
          ref={this.playRef}
          width={0}
          height={0}
          url={url}
          playing={playing}
          onReady={this.onReady}
          onStart={this.onStart}
          onError={this.onError}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onEnded={this.onEnded}
          onBuffer={() => console.log('onBuffer')}
          onSeek={e => console.log('onSeek', e)}
          onProgress={this.onProgress}
          onDuration={this.onDuration}
          volume={volume}
          muted={muted}
        />
      </>
    );
  }
}

const mapStateToProps = ({play}: ConnectState) => ({
  played: play.played,
  url: play.url,
  playing: play.playing,
  volume: play.volume,
  muted: play.muted,
})

export default connect(mapStateToProps)(HocSlider)
