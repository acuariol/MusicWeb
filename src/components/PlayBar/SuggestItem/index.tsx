import React from 'react'
import {createStyles, Divider, List, ListItem, ListItemText, makeStyles, Typography} from '@material-ui/core'
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import AlbumIcon from '@material-ui/icons/Album';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles(() =>
  createStyles({
    suggestItem: {
      display: 'flex',
      padding: '6px 12px',
      alignItems: 'flex-start',
    },
    suggestContent: {
      flexGrow: 1
    },
    suggestType: {
      display: 'flex',
      alignItems: 'center',
      padding: '6px 12px 0 0 ',
      flexShrink: 0
    },
    link: {
      '&:hover': {
        backgroundColor: '#eaeaea',
        cursor: 'pointer'
      }
    },
    typeText: {
      paddingLeft: '0.2rem',
      position: 'relative',
      top: 1
    }
  })
)

enum Type {
  artists = '歌手',
  songs = '歌曲',
  albums = '专辑',
  mvs = '视频',
  playlists = '歌单'
}

export type SuggestItemTpye = {
  item: any[],
  type: string
}

function display(type: string, item: any) {
  if (type === 'artists') return item.name
  if (type === 'albums')
    return `${item.name} - ${item.artist.name}`;

  if (type === 'songs')
    return `${item.name} - ${item.artists.map((o: any) => o.name).join()}`;

  if (type === 'mvs')
    return `${item.name} - ${item.artists.map((o: any) => o.name).join()}`;

  if (type === 'playlists')
    return `${item.name}`;
  return null
}

function icon(type: string) {
  if (type === 'artists') return <PersonOutlineIcon />
  if (type === 'albums') return <AlbumIcon />;
  if (type === 'songs') return <MusicNoteIcon />;
  if (type === 'mvs') return <VideocamIcon />;
  if (type === 'playlists') return <LibraryMusicIcon />;
  return null
}

function SuggestItem({type, item}: SuggestItemTpye) {

  const classes = useStyles()

  const handleClick = (id: number) => {

    const t = type.substr(0, type.length - 1);
    window.open(`https://music.163.com/#/${t}?id=${id}`, '_block')

  }

  if (!Array.isArray(item)) return null

  return (
    <>
      <div className={classes.suggestItem}>
        <div className={classes.suggestType}>
          {icon(type)}
          <Typography variant="body2" className={classes.typeText}>
            {Type[type]}
          </Typography>
        </div>

        <div className={classes.suggestContent}>

          <List dense disablePadding>
            {
              item.map((o: any) => (
                <ListItem className={classes.link} key={o.id} onClick={() => handleClick(o.id)}>
                  <ListItemText>
                    <Typography noWrap variant="body2">
                      {display(type, o)}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ))
            }

          </List>

        </div>
      </div>
      <Divider />
    </>
  )
}

export default SuggestItem
