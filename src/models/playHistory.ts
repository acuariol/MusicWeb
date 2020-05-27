import {Subscription, Reducer} from 'umi';
import {findIndex, filter} from 'lodash'
import {setTrackQueue, getTrackQueue} from '@/utils/utils'

const TrackQueueMaxLength = 99

export interface PlayHistoryModelState {
  open: boolean
  list: any[]
}

export interface PlayHistoryModelType {
  namespace: 'playHistory';
  state: PlayHistoryModelState;
  effects: {};
  reducers: {
    setState: Reducer<PlayHistoryModelState>;
    add: Reducer<PlayHistoryModelState>;
    delete: Reducer<PlayHistoryModelState>;
  };
  subscriptions: { setup: Subscription };
}

const PlayHistoryModel: PlayHistoryModelType = {
  namespace: 'playHistory',

  state: {
    open: false,
    list: getTrackQueue()
  },

  effects: {},

  reducers: {
    setState(state, {payload}): PlayHistoryModelState {
      return {
        ...state,
        ...payload
      };
    },
    add(state, {payload}): PlayHistoryModelState {
      // @ts-ignore
      const {list} = state
      // @ts-ignore
      const index = findIndex(list, o => o.id === payload.id)

      if (index === -1) {
        const newList = [payload, ...list]

        if (list.length >= TrackQueueMaxLength)
          setTrackQueue([payload])
        else setTrackQueue(newList)
        // @ts-ignore
        return {
          ...state,
          // @ts-ignore
          list: newList
        }
      }

      // @ts-ignore
      return {
        ...state
      }
    },

    delete(state, {payload}): PlayHistoryModelState {
      // @ts-ignore
      const newList = filter(state.list, o => o.id !== payload.id)

      setTrackQueue(newList)
      // @ts-ignore
      return {
        ...state,
        // @ts-ignore
        list: newList
      }
    }
  },

  subscriptions: {
    setup(): void {

    },
  },
};

export default PlayHistoryModel;
