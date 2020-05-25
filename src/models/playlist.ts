import {Subscription, Reducer, Effect} from 'umi';
import {playlistDetail, songDetail} from '@/services/song';
import {formatTime} from '@/utils/utils'

export interface PlaylistModelType {
  namespace: 'playlist';
  state: PlaylistModelState;
  effects: {
    fetchPlaylistDetail: Effect;
    fetchPlaylist: Effect;
  };
  reducers: {
    setState: Reducer<PlaylistModelState>;
  };
  subscriptions: { setup: Subscription };
}

export type PlaylistInfo = {
  createTime: number | string
  name: string
  description: string
  tags: string[]
  playCount: number | string
  coverImgUrl: string
  creator: {
    avatarUrl: string
    nickname: string
  }
  subscribedCount: number | string
  commentCount: number | string
  shareCount: number | string

  [propsName: string]: any
}


export interface PlaylistModelState {
  playlistInfo: PlaylistInfo
  playlist: any[],

  [propsName: string]: any
}


const PlaylistModel: PlaylistModelType = {
  namespace: 'playlist',
  state: {
    playlistInfo: {
      createTime: '',
      name: 'Beatz',
      description: '',
      tags: [],
      playCount: 0,
      coverImgUrl: 'http://acuario.cn/assets/block.png',
      creator: {
        avatarUrl: '',
        nickname: 'Beatz',
      },
      subscribedCount: 0,
      commentCount: 0,
      shareCount: 0,
    },
    playlist: []
  },
  effects: {

    * fetchPlaylistDetail({payload}, {call, put}) {
      const {code, playlist} = yield call(playlistDetail, payload.id);

      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {
            playlistInfo: {
              createTime: formatTime(playlist.createTime),
              name: playlist.name,
              description:
                playlist.description.length >= 160
                  ? `${playlist.description.substr(0, 160)}...` :
                  playlist.description,
              tags: playlist.tags,
              playCount: playlist.playCount,
              coverImgUrl: playlist.coverImgUrl,
              creator: {
                avatarUrl: playlist.creator.avatarUrl,
                nickname: playlist.creator.nickname,
              },
              subscribedCount: playlist.subscribedCount,
              commentCount: playlist.commentCount,
              shareCount: playlist.shareCount,
            }
          }
        })


        const ids = (playlist.trackIds || []).map((item: any) => item.id).join()

        if (ids)
          yield put({
            type: 'fetchPlaylist',
            payload: {ids}
          })

      }
    },

    * fetchPlaylist({payload}, {call, put}) {
      const {code, songs} = yield call(songDetail, payload.ids);

      if (code === 200) {
        yield put({
          type: 'setState',
          payload: {
            playlist: (songs || []).map((item: any) => ({
              id: item.id,
              name: item.name,
              artists: item.ar,
              album: item.al.name,
              playTime: 0,
            }))
          }
        })
      }
      // console.log(songs)

    }
  },
  reducers: {
    setState(state, {payload}): PlaylistModelState {
      return {
        ...state,
        ...payload
      };
    },
  },
  subscriptions: {
    setup(): void {

    },
  }
}
export default PlaylistModel
