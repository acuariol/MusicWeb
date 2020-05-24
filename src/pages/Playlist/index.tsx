import React from 'react';
import {List, Paper} from "@material-ui/core";
import {connect} from 'umi'
import PlayListDetail from '@/components/PlayListDetail'
import ListSongItem from '@/components/ListSongItem'
import {ConnectState, Dispatch} from "@/models/connect";
import {PlaylistInfo} from '@/models/playlist'
import {history} from "umi";


type Props = {
  location: {
    query: {
      id: string
    }
  },
  dispatch: (parse: Dispatch) => void
  playlistInfo: PlaylistInfo
  classes: any
  playlist: any[]
};
type State = {};

class Playlist extends React.Component<Props, State> {

  componentDidMount() {

    const {location: {query}, dispatch} = this.props;

    if (query.id)
      dispatch({
        type: 'playlist/fetchPlaylistDetail',
        payload: {id: query.id}
      })
    else history.replace(`/`)

  }

  // componentDidUpdate(prevProps: Readonly<Props>,) {
  //   console.log('componentDidUpdate')
  //   console.log(prevProps)
  // }

  handlePlay = (item: any) => {
    console.log(item)

  }

  render() {
    const {playlistInfo, playlist} = this.props;


    return (
      <>
        <PlayListDetail {...playlistInfo} />

        <Paper style={{padding: '2rem', marginTop: '4rem'}}>
          <List component="div">
            {
              playlist.map((item: any) => (
                <ListSongItem key={item.id} item={item} onPlayClick={this.handlePlay} />
              ))
            }
          </List>
        </Paper>

      </>
    );
  };
}


const mapStateToProps = ({playlist}: ConnectState) => ({
  playlistInfo: playlist.playlistInfo,
  playlist: playlist.playlist
})

export default connect(mapStateToProps)(Playlist)
