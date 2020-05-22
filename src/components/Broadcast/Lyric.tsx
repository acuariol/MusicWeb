import React from 'react'
import {connect} from 'umi'
import {createStyles, makeStyles, Theme, Typography, CircularProgress} from "@material-ui/core";
import {ConnectState} from "@/models/connect";
import cls from 'classnames'
import {Lrc, LrcLine} from '@/components/Lyric';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    lyric: {
      width: '100%',
      height: 360,
      overflow: 'auto',
      '-webkit-scrollbar-thumb': 'rgba(255,255,255,0.3)',
      boxSizing: 'border-box'
    },
    lrcLine: {
      padding: '6px 0'
    },
    activeLine: {
      color: theme.palette.primary.main
    },
    loading: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem'
    }
  })
)

type LyricProps = {
  playedSeconds: number,
  lyric: string,
  show: boolean,
  loading: boolean | undefined,
}

function Lyric({playedSeconds, lyric, show, loading}: LyricProps) {
  const classes = useStyles()

  // return <div className={classes.lyric}></div>

  if (!show) return null
  if (loading) return <div className={classes.loading}><CircularProgress /></div>

  return (
    <Lrc
      lrc={lyric}
      currentTime={playedSeconds * 1000}
      className={classes.lyric}
    >
      {({content}, active, index) => (
        <LrcLine key={index} className={cls(classes.lrcLine, active && classes.activeLine)}>
          <Typography variant="body1"> {content}</Typography>
        </LrcLine>
      )}
    </Lrc>
  )

}

const mapStateToProps = ({play, song, global, loading}: ConnectState) => ({
  playedSeconds: play.playedSeconds,
  lyric: song.lyric.lyr,
  show: global.showGalileo,
  loading: loading.effects['song/fetchLyric'],
})

export default connect(mapStateToProps)(Lyric)
