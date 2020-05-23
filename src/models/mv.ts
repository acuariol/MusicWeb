import {Subscription, Reducer, Effect} from 'umi';
import {topMv, mvUrl} from '@/services/song';
import {formatNumToTenThousand} from '@/utils/utils'

export interface MvModelType {
  namespace: 'mv';
  state: MvModelState;
  effects: {
    fetchTopMv: Effect;
    fetchMvUrl: Effect;
  };
  reducers: {
    setState: Reducer<MvModelState>;
  };
  subscriptions: { setup: Subscription };
}

export type HoverItem = {
  cover: string,
  id: number,
  [propsName: string]: any
}


export interface MvModelState {
  topMv: any[],
  hoverItem: HoverItem,
  url: string,

  [propsName: string]: any
}


const MvModel: MvModelType = {
  namespace: 'mv',
  state: {
    topMv: [],
    hoverItem: {
      cover: 'http://acuario.cn/assets/block16v9.png',
      id: -1,
    },
    url: '',

    // mv播放器相关的状态
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

    * fetchTopMv({payload}, {call, put}) {
      const {code, data} = yield call(topMv, payload);

      if (code && code === 200) {

        const list = (data || []).map((o: any, i: number) => ({
          ...o,
          playCount: formatNumToTenThousand(o.playCount),
          index: i + 1
        }))

        yield put({
          type: 'setState',
          payload: {
            topMv: list,
            hoverItem: {
              cover: list[0] ? list[0].cover : 'http://acuario.cn/assets/block16v9.png',
              id: -1,
            }
          },
        });

      }
    },

    * fetchMvUrl({payload}, {call, put}) {
      const {code, data} = yield call(mvUrl, payload.id);
      if (code === 200) {
        yield put({
          type: 'setState',
          payload: {url: data.url}
        });

      }
    }


  },
  reducers: {
    setState(state, {payload}): MvModelState {
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
export default MvModel
