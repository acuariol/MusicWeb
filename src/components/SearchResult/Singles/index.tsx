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
  Typography
} from "@material-ui/core";
import {SongsItemProps} from "@/models/song";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import {ConnectState, Dispatch} from "@/models/connect";

const useStyles = makeStyles((theme: Theme) => createStyles({
  action: {
    display: 'flex',
    alignItems: 'center'
  },

  listItem: {
    padding: '6px 12px 6px 6px',
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
  p2: {
    width: 240,
    padding: '0 14px'
  },
  p3: {
    padding: '0 24px 0 12px'
  },
  hs: {
    visibility: 'hidden',
    margin: '0 10px'
  },
  bottomNavigation: {
    width: 500,
    margin: 'auto'
  },
}))

interface SinglesProps {
  dispatch: (pares: Dispatch) => void,
  songs: Array<SongsItemProps>,
}


function Singles(props: SinglesProps) {
  const {songs, dispatch} = props;
  const classes = useStyles()
  const handlePlay = (item: SongsItemProps) => {
    dispatch({
      type: 'play/fetchSongUrl',
      payload: {id: item.id, playTime: item.duration}
    })

  };
  return (
    <>
      <List component="div">
        {
          songs.map((o: SongsItemProps) => (
            <ListItem className={classes.listItem} key={o.id}>
              <ListItemIcon>
                <Tooltip title="播放" placement="left">
                  <IconButton onClick={() => handlePlay(o)}>
                    <PlayCircleOutlineIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1" noWrap>{o.name}</Typography>
              </ListItemText>
              <div className={classes.action}>
                <Tooltip title="添加到播放列表">
                  <IconButton color="inherit" className={classes.hs}>
                    <AddIcon color="inherit" />
                  </IconButton>
                </Tooltip>
                <Typography variant="body1" className={classes.p2} noWrap>{o.artists.join()}</Typography>
                <Typography variant="body1" className={classes.p2} noWrap>{o.album}</Typography>
                <Typography variant="body1" className={classes.p3} noWrap>{o.playTime}</Typography>
              </div>
            </ListItem>
          ))
        }
      </List>
    </>
  );
}

const mapStateToProps = ({song}: ConnectState) => ({
  songs: song.songs,

})


export default connect(mapStateToProps)(Singles)
