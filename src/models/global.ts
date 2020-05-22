import {Subscription, Reducer} from 'umi';

export interface GlobalModelState {
  keywords: string,
  type: '1',

  showGalileo:boolean
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    setState: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    keywords: '',
    type: '1',
    showGalileo:false
  },

  effects: {},

  reducers: {

    setState(state, {payload}): GlobalModelState {
      return {
        ...state,
        ...payload
      };
    },
  },

  subscriptions: {
    setup(): void {

    },
  },
};

export default GlobalModel;
