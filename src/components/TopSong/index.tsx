import React from 'react'
import {Card, CardActionArea, CardMedia, Typography} from '@material-ui/core'
import {connect} from 'umi'
import cls from 'classnames'
import {Dispatch} from "@/models/connect";
import {TopSongItemProps} from '@/models/song'
import styles from './styles.less'


interface TopSongProps {
  topSong: TopSongItemProps[],
  dispatch: (params: Dispatch) => void
}

function TopSong(props: TopSongProps) {

  const onClick = (item: TopSongItemProps) => {
    if (item && item.id && !item.loading)
      props.dispatch({
        type: 'play/fetchSongUrl',
        payload: {id: item.id, }
      })
  };

  return (
    <div className={styles.container}>
      {
        props.topSong.map((o: TopSongItemProps) => (
          <Card className={styles.item} key={o.id} elevation={0} onClick={() => onClick(o)}>
            <CardActionArea>
              <CardMedia
                image={o.picUrl}
                title={o.name}
                className={styles.img}
              />

              <div className={styles.action}>
                <Typography
                  title={o.name}
                  noWrap
                  className={cls(styles.title, o.loading && styles.loadingLarge)}
                >
                  {o.name}
                </Typography>
                <Typography
                  title={o.artists}
                  noWrap
                  variant="body2"
                  className={cls(styles.name, o.loading && styles.loadingSort)}
                >
                  {o.artists}
                </Typography>
              </div>
            </CardActionArea>
          </Card>
        ))
      }
    </div>
  )
}

export default connect()(TopSong)
