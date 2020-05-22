import React from 'react'
import {createStyles, makeStyles, Paper, Tab, Tabs} from "@material-ui/core";
import AlbumIcon from '@material-ui/icons/Album';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VideocamIcon from '@material-ui/icons/Videocam';

import {useLocation} from 'umi'

const useStyles = makeStyles(() => createStyles({
  bottomNavigation: {
    width: 500,
    margin: 'auto'
  },
  root: {
    flexGrow: 1,
    maxWidth: 664,
    margin: '24px auto 64px'
  },
}))

interface TypeNavigationProps {
  keywords: string,
  onChange: (type: string) => void
}

// <BottomNavigation
//   showLabels value={query.type || '1'} onChange={handleChange} className={classes.bottomNavigation}
// >
//   <BottomNavigationAction label="单曲" value="1" icon={<RestoreIcon fontSize="large" />} />
//   <BottomNavigationAction label="专辑" value="10" icon={<FavoriteIcon fontSize="large" />} />
//   <BottomNavigationAction label="歌单" value="1000" icon={<LocationOnIcon fontSize="large" />} />
//   <BottomNavigationAction label="用户" value="1004" icon={<FolderIcon fontSize="large" />} />
// </BottomNavigation>

function TypeNavigation(props: TypeNavigationProps) {

  // @ts-ignore
  const {query} = useLocation()
  const classes = useStyles()
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    props.onChange(newValue)
  }

  return (

    <Paper square className={classes.root}>
      <Tabs
        value={query.type || '1'}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab icon={<MusicNoteIcon fontSize="large" />} label="单曲" value="1"/>
        <Tab icon={<AlbumIcon fontSize="large" />} label="专辑" value="10"/>
        <Tab icon={<LibraryMusicIcon fontSize="large" />} label="歌单" value="1000"/>
        <Tab icon={<VideocamIcon fontSize="large" />} label="视频" value="1014"/>
      </Tabs>
    </Paper>

  )
}

export default TypeNavigation

