import React from 'react';
import {
  createStyles,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Tooltip,
  Typography
} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AddIcon from "@material-ui/icons/Add";

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

type DataItem = {
  id: number | string
  name?: string,
  artists?: string[],
  album?: string
  playTime?: string
  [props: string]: any
}

interface ListSongItemProps {
  item: DataItem,
  onPlayClick: (o: any) => void
}


function ListSongItem(props: ListSongItemProps) {
  const {item, onPlayClick} = props;
  const classes = useStyles();

  const handlePlay = (o: DataItem) => {
    onPlayClick(o)
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Tooltip title="播放" placement="left">
          <IconButton onClick={() => handlePlay(item)}>
            <PlayCircleOutlineIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1" noWrap>{item.name}</Typography>
      </ListItemText>
      <div className={classes.action}>
        <Tooltip title="添加到播放列表">
          <IconButton color="inherit" className={classes.hs}>
            <AddIcon color="inherit" />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" className={classes.p2} noWrap>
          {(item.artists || []).map((o: any) => o.name).join('/')}
        </Typography>
        <Typography variant="body1" className={classes.p2} noWrap>{item.album}</Typography>
        <Typography variant="body1" className={classes.p3} noWrap>{item.playTime}</Typography>
      </div>
    </ListItem>
  );
}


export default ListSongItem
