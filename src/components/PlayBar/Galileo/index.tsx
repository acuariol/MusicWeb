import React from 'react'
import {makeStyles, createStyles} from '@material-ui/core'
import {connect} from 'umi'
import {ConnectState} from "@/models/connect";
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import CircularProgress from '@material-ui/core/CircularProgress';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      minWidth: 74,
      width: 74,
      position: 'relative',
      '&:hover $mask': {
        display: 'flex',
      }
    },
    loading: {
      height: '100%',
      minWidth: 74,
      width: 74,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    img: {
      width: '100%',
      height: '100%'
    },
    mask: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)',
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

function Galileo({dispatch, loading, url, picUrl, show, commentSongId, playSongId, lyricSongId}: any) {

  const classes = useStyles()
  const handleClick = () => {
    if (!url) return
    // 获取评论
    if ((playSongId !== commentSongId) && !show) {
      dispatch({
        type: 'song/fetchMusicComment',
        payload: {
          id: playSongId
        }
      })
    }

    // 获取歌词
    if ((playSongId !== lyricSongId) && !show) {
      dispatch({
        type: 'song/fetchLyric',
        payload: {
          id: playSongId
        }
      })
    }

    dispatch({
      type: 'global/setState',
      payload: {
        showGalileo: !show
      }
    })
  }

  if (!url) return null

  if (loading) return <div className={classes.loading}><CircularProgress size="30" /></div>

  return (
    <div className={classes.root} onClick={handleClick}>
      {picUrl && <img src={picUrl} alt="" className={classes.img} />}
      <div className={classes.mask}>
        {
          show ? <FullscreenExitIcon fontSize="large" /> : <FullscreenIcon fontSize="large" />
        }
      </div>
    </div>
  )
}


const mapStateToProps = ({play, loading, global, song}: ConnectState) => ({
  loading: loading.effects['play/fetchSongUrl'],
  picUrl: play.detail ? play.detail.al.picUrl : '',
  url: play.url,
  show: global.showGalileo,
  commentSongId: song.commentData.songId,
  lyricSongId: song.lyric.songId,
  playSongId: play.songId
})

export default connect(mapStateToProps)(Galileo)
