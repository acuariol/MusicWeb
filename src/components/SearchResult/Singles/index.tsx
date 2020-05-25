import React from 'react';
import {connect} from 'umi';
import {List} from "@material-ui/core";
import {SongsItemProps} from "@/models/song";
import {ConnectState, Dispatch} from "@/models/connect";

import ListSongItem from '@/components/ListSongItem'
import CheckPlaying from "@/components/CheckPlaying";

interface SinglesProps {
  dispatch: (pares: Dispatch) => void,
  songs: Array<SongsItemProps>,
}


function Singles(props: SinglesProps) {
  const {songs, dispatch} = props;

  const handlePlay = (item: SongsItemProps) => {
    dispatch({
      type: 'play/fetchSongUrl',
      payload: {id: item.id}
    })

  };
  return (
    <>
      <List component="div">
        {
          songs.map((item: any) => (
            <CheckPlaying currentSongId={item.id} key={item.id}>
              {
                (state: boolean) => <ListSongItem
                  isItem={state}  item={item} onPlayClick={handlePlay}
                />
              }
            </CheckPlaying>
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
