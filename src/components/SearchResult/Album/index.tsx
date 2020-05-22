import React from 'react';
import {connect} from 'umi';
import {Card, CardActionArea, CardMedia, Typography} from "@material-ui/core";
import {albumItemProps} from "@/models/song";
import {ConnectState, Dispatch} from "@/models/connect";


import styles from "./styles.less";

//
// const useStyles = makeStyles(() => createStyles({
//
// }))

interface AlbumProps {

  dispatch: (pares: Dispatch) => void,
  albums: Array<albumItemProps>,

}


function Album(props: AlbumProps) {

  const {albums} = props;
  // const classes = useStyles()

  const onClick = (item: albumItemProps) => {
    console.log(item)
  }

  return (
    <>
      <div className={styles.container}>
        {
          albums.map((o: albumItemProps) => (
            <Card className={styles.item} key={o.id} elevation={0} onClick={() => onClick(o)}>
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  image={o.picUrl}
                  title={o.name}
                />

                <div className={styles.action}>
                  <Typography noWrap className={styles.title}>{o.name}</Typography>
                  <Typography noWrap variant="body2" className={styles.name}>{o.userName}</Typography>
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
  albums: song.albums,
  // loading:loading.effects['song/']
})


export default connect(mapStateToProps)(Album)
