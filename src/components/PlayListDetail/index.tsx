import React from 'react'
import {
  makeStyles,
  createStyles,
  Theme,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Card,
  Chip,
} from "@material-ui/core";
import {PlaylistInfo} from '@/models/playlist'
import MaskLoading from '@/components/Loading/MaskLoading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
      height: 300,
      position: 'relative'
    },
    cover: {
      width: 300,
      height: 300,
    },
    content: {
      flex: '1',
      paddingLeft: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
      // backgroundColor:'red'
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem 0 0 0'
    },

    paddingRight1: {
      padding: '0 0 0 0.8rem'
    },
    tag: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '0.5rem',
    },
    chip: {
      marginRight: theme.spacing(0.5)
    }
  })
)


function PlayListDetail(props: PlaylistInfo) {

  const classes = useStyles()
  return (
    <Card square className={classes.root}>
      {props.loading&&<MaskLoading/>}

      {
        props.coverImgUrl && (
          <CardMedia
            className={classes.cover}
            image={props.coverImgUrl}
            title=""
          />
        )
      }

      <CardContent className={classes.content}>
        <div>
          <Typography component="h5" variant="h5">
            {props.name}
          </Typography>
          <div className={classes.subtitle}>
            <Avatar src={props.creator.avatarUrl} />
            <Typography variant="subtitle1" color="textPrimary" className={classes.paddingRight1}>
              {props.creator.nickname}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.paddingRight1}>
              {props.createTime}
            </Typography>
          </div>
        </div>

        <div>
          <div className={classes.tag} hidden={props.tags.length === 0}>
            <Typography display="inline">标签：</Typography>
            {
              props.tags.map((o: string) => (
                <Chip key={o} label={o} className={classes.chip} />
              ))
            }
          </div>
          <Typography hidden={!props.description}>
            介绍：{props.description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )

}

export default PlayListDetail
