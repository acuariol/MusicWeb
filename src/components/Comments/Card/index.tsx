import React from 'react'
import {
  makeStyles,
  createStyles,
  Card,
  Avatar,
  Typography,
  IconButton,
  CardContent, Theme
} from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#000',
      marginBottom: '1.4rem'
    },
    cardTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    imgNick: {
      display: 'flex',
      alignItems: 'center'
    },
    imgNickText: {
      paddingLeft: '1rem',
      fontWeight: 'bold',
      color: theme.palette.primary.main
    },
    cardContent: {
      padding: '0.8rem 0'
    },
    cardAction: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

    },
    time: {},
    like: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    likeText: {
      paddingLeft: '0.6rem',
      position: 'relative',
      top: '0.1rem'
    },
    beReplied: {
      padding: '1rem',
      backgroundColor: 'rgba(0,0,0,0.03)',
      borderRadius: 4,
    }
  })
)

type Props = {
  index?: number,
  item: any
}

function CommentCard({item}: Props) {

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.cardTitle}>
          <div className={classes.imgNick}>
            <Avatar src={item.user.avatarUrl} />
            <Typography className={classes.imgNickText}>{item.user.nickname}</Typography>
          </div>

          <div>
            <IconButton color="inherit"><MoreHorizIcon color="inherit" /></IconButton>
          </div>
        </div>

        <div className={classes.cardContent}>
          <Typography gutterBottom={!!item.beReplied.length}>{item.content}</Typography>

          {
            item.beReplied.map((o: any) => (
              <div
                key={o.beRepliedCommentId} className={classes.beReplied}
              >
                <Typography gutterBottom>
                  @{o.user.nickname}：
                </Typography>

                <Typography>
                  {o.content}
                </Typography>
              </div>
            ))
          }
        </div>

        <div className={classes.cardAction}>
          <div className={classes.time}>
            {item.time}
          </div>
          <div className={classes.like}>
            <ThumbUpAltOutlinedIcon fontSize="small" />
            <Typography className={classes.likeText}>{item.likedCount}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}

export default CommentCard
