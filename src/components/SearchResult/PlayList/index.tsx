import React from 'react';
import {connect} from 'umi';
import {
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  CardMedia
} from "@material-ui/core";
import {PlayListItemProps} from "@/models/song";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import {ConnectState, Dispatch} from "@/models/connect";

const useStyles = makeStyles((theme: Theme) => createStyles({
  action: {
    display: 'flex',
    alignItems: 'center'
  },

  listItem: {
    padding: '8px 12px 8px 6px',
    marginBottom: 6,
    '&:hover': {
      backgroundColor: '#f0f0f0 !important',
      cursor: 'pointer',
    },
    '&:nth-child(odd)': {
      backgroundColor: '#fff',
    },
    '&:nth-child(even)': {
      backgroundColor: '#F7F7F7',
    },
    '&:hover $hs': {
      visibility: 'visible'
    }
  },
  icon: {
    color: theme.palette.primary.main
  },
  p1: {
    width: 100,
    padding: '0 14px'
  },
  p2: {
    width: 130,
    padding: '0 14px'
  },
  p3: {
    width: 200,
    padding: '0 14px'
  },
  hs: {
    visibility: 'hidden',
    margin: '0 10px'
  },
  bottomNavigation: {
    width: 500,
    margin: 'auto'
  },
  img: {
    height: 54,
    width: 54,
    marginRight: 12,
    borderRadius: 4
  }
}))

interface PlayListProps {
  dispatch: (pares: Dispatch) => void,
  playList: Array<PlayListItemProps>,
}


function PlayList(props: PlayListProps) {

  const {playList} = props;
  const classes = useStyles()

  const handlePlay = (item: PlayListItemProps) => {
    console.log(item)


  };


  return (
    <>
      <List component="div">
        {
          playList.map((o: PlayListItemProps) => (
            <ListItem className={classes.listItem} key={o.id}>
              <ListItemIcon>
                <Tooltip title="播放" placement="left">
                  <IconButton onClick={() => handlePlay(o)}>
                    <PlayCircleOutlineIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>

              <CardMedia
                image={o.coverImgUrl}
                className={classes.img}
              />

              <ListItemText>
                <Typography variant="body1" noWrap>{o.name}</Typography>
              </ListItemText>
              <div className={classes.action}>
                <Tooltip title="添加到播放列表">
                  <IconButton color="inherit" className={classes.hs}>
                    <AddIcon color="inherit" />
                  </IconButton>
                </Tooltip>

                <Typography variant="body1" className={classes.p1} noWrap>{o.trackCount}首</Typography>
                <Typography variant="body1" className={classes.p3} noWrap>by {o.nickname}</Typography>
                <Typography variant="body1" className={classes.p2} noWrap>收藏：{o.bookCount}</Typography>
                <Typography variant="body1" className={classes.p2} noWrap>播放：{o.playCount}</Typography>
              </div>
            </ListItem>
          ))
        }
      </List>
    </>
  );
}

const mapStateToProps = ({song}: ConnectState) => ({
  playList: song.playList,

})


export default connect(mapStateToProps)(PlayList)
