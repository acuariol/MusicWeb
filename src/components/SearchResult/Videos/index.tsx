import React from 'react';
import {connect} from 'umi';
import {Card, CardActionArea, CardMedia, Typography} from "@material-ui/core";
import {VideoItemProps} from "@/models/song";
import {ConnectState, Dispatch} from "@/models/connect";
import NoData from '../NoData'
import styles from './styles.less'

//
// const useStyles = makeStyles(() => createStyles({
//
// }))

interface VideosProps {
  dispatch: (pares: Dispatch) => void,
  videos: Array<VideoItemProps>,

}


function Videos(props: VideosProps) {

  const {videos,} = props;
  // const classes = useStyles()

  const onClick = (item: VideoItemProps) => {
    window.open(`https://music.163.com/#/video?id=${item.vid}`,'_block')

  }


  return (
    <>
      {videos.length === 0 && (<NoData />)}
      <div className={styles.container}>
        {
          videos.map((o: VideoItemProps) => (
            <Card className={styles.item} key={o.vid} elevation={0} onClick={() => onClick(o)}>
              <CardActionArea>
                <CardMedia
                  image={o.coverUrl}
                  className={styles.img}
                  title={o.title}
                />
                <div className={styles.action}>
                  <Typography className={styles.title}>{o.title}</Typography>
                  <Typography
                    variant="body2"
                    noWrap
                    className={styles.name}
                  >
                    {o.creator.map(i => i.userName).join()}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          ))
        }
      </div>
    </>
  );
}

const mapStateToProps = ({song}: ConnectState) => ({
  videos: song.videos,
  // loading:loading.effects['song/']
})


export default connect(mapStateToProps)(Videos)
