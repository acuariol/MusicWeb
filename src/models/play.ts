import {Effect, Reducer} from 'umi';
import {checkMusic, songDetail, songUrl} from '@/services/song';

import {formatMilliSeconds} from '@/utils/utils'
import {ConnectState} from "@/models/connect";
import {findIndex} from "lodash";

export interface PlayModelState {
  url: string
  playTime?: number,
  songId: number | null,

  detail: any,

  playing: boolean,
  controls: boolean,
  light: boolean,
  volume: number,
  muted: boolean,
  played: number,
  loaded: number,
  duration: number,
  playbackRate: number,
  loop: boolean,
  loadedSeconds: number,
  playedSeconds: number
}

export interface PlayModelType {
  namespace: 'play';
  state: PlayModelState;
  effects: {
    fetchSongUrl: Effect;
    skip: Effect;
  };
  reducers: {
    setState: Reducer<PlayModelState>;
  };
  subscriptions: {};
}

const PlayModel: PlayModelType = {
  namespace: 'play',
  state: {
    url: '',
    playTime: 0, // ms
    songId: null,

    detail: {
      id: null,
      name: '',
      ar: [
        {
          id: 0,
          name: ''
        },
      ],
      al: {
        id: 0,
        name: '',
        picUrl: ''
      }
    },
    // 播放器相关的状态
    playing: false,
    controls: false,
    light: false,
    volume: 0.800,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    loadedSeconds: 0,
    playedSeconds: 0
  },
  effects: {
    * fetchSongUrl({payload}, {call, put}) {
      const {success, message} = yield call(checkMusic, payload.id);
      if (success) {

        // 获取歌曲url
        const {code, data} = yield call(songUrl, payload.id);
        if (code && code === 200) {
          yield put({
            type: 'setState',
            payload: {
              url: Array.isArray(data) ? data[0].url : '',
              songId: payload.id
            },
          });
        }

        // 获取歌曲详情
        const {code: c, songs} = yield call(songDetail, payload.id);

        if (c && c === 200 && songs && Array.isArray(songs)) {
          const d = songs[0]
          yield put({
            type: 'setState',
            payload: {
              detail: {
                name: d.name,
                id: d.id,
                ar: d.ar,
                al: d.al
              }
            },
          });

          yield put({
            type: 'playHistory/add',
            payload: {
              name: d.name,
              id: d.id,
              artists: d.ar,
              album: d.al,
              playTime: formatMilliSeconds(d.dt)
            },
          });

        }

      } else {
        alert(message || '亲爱的,暂无版权')
      }

    },

    * skip({payload}, {put, select}) {

      const {type} = payload
      const {list, songId} = yield select(({playHistory, play}: ConnectState) => ({
        list: playHistory.list,
        songId: play.songId
      }))

      if (list.length === 0) return;
      const index = findIndex(list, (o: any) => o.id === songId);

      if (index === -1) {
        if (typeof list[0] === 'undefined') return;

        yield put({
          type: 'fetchSongUrl',
          payload: {id: list[0].id},
        })
        return;
      }

      if (type === 'next') {
        const i = index + 1 > list.length - 1 ? 0 : index + 1;
        if (typeof list[i] === 'undefined') return;
        yield put({
          type: 'fetchSongUrl',
          payload: {id: list[i].id},
        })
        return;
      }

      if (type === 'prev') {
        const i = index - 1 < 0 ? list.length - 1 : index - 1;
        if (typeof list[i] === 'undefined') return;
        yield put({
          type: 'fetchSongUrl',
          payload: {id: list[i].id},
        })
      }


    }

  },
  reducers: {
    setState(state, {payload}): PlayModelState {
      return {
        ...state,
        ...payload
      };
    },
  },
  subscriptions: {}
}
export default PlayModel
