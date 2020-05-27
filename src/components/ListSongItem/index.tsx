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
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import {formatNumber} from '@/utils/utils'


const useStyles = makeStyles((theme: Theme) => {


  return createStyles({
    action: {
      display: 'flex',
      alignItems: 'center'
    },
    listItem: {
      padding: '6px 12px 6px 6px',
      // @ts-ignore
      color: props => props.dark ? '#fff' : '#000',
      marginBottom: 6,
      '&:hover': {
        // @ts-ignore
        backgroundColor: props => props.dark ? '#353535 !important' : '#f0f0f0 !important',
        cursor: 'pointer',
      },
      '&:nth-child(odd)': {
        // @ts-ignore
        backgroundColor: props => props.dark ? '#424242' : '#fff',
      },
      '&:nth-child(even)': {
        // @ts-ignore
        backgroundColor: props => props.dark ? '#4e4e4e' : '#fff',
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
  })
})

type DataItem = {
  id: number | string
  name?: string,
  artists?: any[],
  album?: { [propsName: string]: any }
  playTime?: string
  attachSlot?: React.ReactElement,
  [props: string]: any
}

interface ListSongItemProps {
  item: DataItem
  onPlayClick?: (o: any) => void
  isItem?: boolean
  dark?: boolean
  attach?: boolean
  index?: number
  [props: string]: any
}


function ListSongItem(props: ListSongItemProps) {
  const {item, onPlayClick, isItem, dark, attach, attachSlot,index} = props;
  const classes = useStyles({dark});

  const handlePlay = (o: DataItem) => {
    if (typeof onPlayClick === 'function')
      onPlayClick(o)
  };

  return (
    <ListItem className={classes.listItem}>
      <Typography variant="body1" noWrap>
        {index&&`${formatNumber(index)}`}
      </Typography>

      <ListItemIcon>
        {
          isItem && (
            <Tooltip title="正在播放" placement="left">
              <div style={{padding: 12}}>
                <VolumeUpRoundedIcon color="primary" />
              </div>
            </Tooltip>
          )
        }

        <Tooltip title="播放" placement="left">
          <IconButton onClick={() => handlePlay(item)} hidden={isItem}>
            <PlayCircleOutlineIcon className={classes.icon} />
          </IconButton>
        </Tooltip>

      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1" noWrap>{item.name}</Typography>
      </ListItemText>
      <div className={classes.action}>
        <div className={classes.hs}>
          {
            attachSlot
          }
          {
            attach && (
              <>
                <Tooltip title="添加到播放列表">
                  <IconButton color="inherit">
                    <AddIcon color="inherit" />
                  </IconButton>
                </Tooltip>
              </>
            )
          }
        </div>

        <Typography variant="body1" className={classes.p2} noWrap>
          {(item.artists || []).map((o: any) => o.name).join('/')}
        </Typography>
        <Typography variant="body1" className={classes.p2} noWrap>{item.album?item.album.name:''}</Typography>
        <Typography variant="body1" className={classes.p3} noWrap>{item.playTime}</Typography>
      </div>
    </ListItem>
  );
}


export default ListSongItem
