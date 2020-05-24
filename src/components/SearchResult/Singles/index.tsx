import React from 'react';
import {connect} from 'umi';
import {List} from "@material-ui/core";
import {SongsItemProps} from "@/models/song";
import {ConnectState, Dispatch} from "@/models/connect";

import ListSongItem from '@/components/ListSongItem'

interface SinglesProps {
  dispatch: (pares: Dispatch) => void,
  songs: Array<SongsItemProps>,
}


function Singles(props: SinglesProps) {
  const {songs, dispatch} = props;

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
          songs.map((o: any) => (
            <ListSongItem key={o.id} onPlayClick={handlePlay} item={o}/>
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
