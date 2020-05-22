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
  url: string
}



const MvModel: MvModelType = {
  namespace: 'mv',
  state: {
    topMv: [],
    hoverItem: {
      cover: 'http://p1.music.126.net/-LkI0yoGquAWFl2W3kEXIg==/109951164536308330.jpg',
      id: -1,
    },
    url: ''
  },
  effects: {

    * fetchTopMv({payload}, {call, put}) {
      const {code, data} = yield call(topMv, payload);

      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {
            topMv: (data || []).map((o: any, i: number) => ({
              ...o,
              playCount: formatNumToTenThousand(o.playCount),
              index: i + 1
            }))
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
