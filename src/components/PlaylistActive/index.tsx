import React from 'react';
import {Button, makeStyles, createStyles} from '@material-ui/core';
import {connect} from 'umi';
import {ConnectState, Dispatch} from '@/models/connect';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import {setTrackQueue} from "@/utils/utils";

const useStyles = makeStyles(() => createStyles({
  root: {
    margin: '64px 0 0 0',
    display: 'flex'
  },
  active: {
    marginLeft: 'auto',
    '& > *': {
      margin: '0 0.5rem',
      '&:last-child': {
        margin: 0
      }
    },

  }
}))

const mapStateToProps = ({playlist,}: ConnectState) => ({
  subscribedCount: playlist.playlistInfo.subscribedCount,
  commentCount: playlist.playlistInfo.commentCount,
  shareCount: playlist.playlistInfo.shareCount,
  playCount: playlist.playlistInfo.playCount,
  playlist: playlist.playlist
});

type Props = {
  subscribedCount: number | string
  commentCount: number | string
  shareCount: number | string
  playCount: number | string
  hidden?: boolean
  dispatch: (parse: Dispatch) => void
  playlist: any[]
};

function PlaylistActive(props: Props) {

  const classes = useStyles();

  const click = () => {
    const {playlist, dispatch} = props
    setTrackQueue(playlist)
    dispatch({
      type: 'playHistory/setState',
      payload: {
        list: playlist
      }
    })


    if(playlist[0]){
      dispatch({
        type: 'play/fetchSongUrl',
        payload: {
          id: playlist[0].id
        }
      })
    }
  }

  const {subscribedCount, commentCount, shareCount, playCount, hidden} = props
  return (
    <div className={classes.root} hidden={hidden}>
      <Button variant="contained" color="primary" disableElevation onClick={click}>
        <PlayCircleOutlineIcon style={{marginRight: '10px'}} />
        播放全部
      </Button>

      <div className={classes.active}>
        <Button variant="contained" disableElevation>收藏（{subscribedCount}）</Button>
        <Button variant="contained" disableElevation>评论（{commentCount}）</Button>
        <Button variant="contained" disableElevation>分享（{shareCount}）</Button>
        <Button variant="contained" disableElevation>播放（{playCount}）</Button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PlaylistActive);
