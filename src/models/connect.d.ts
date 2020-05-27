import {GlobalModelState} from './global';
import {DefaultSettings as SettingModelState} from '../../config/defaultSettings';
import {UserModelState} from './user';
import {SongModelState} from './song';
import {PlayModelState} from './play';
import {MvModelState} from './mv';
import {PlaylistModelState} from './playlist';
import {PlayHistoryModelState} from './playHistory';


export {
  GlobalModelState,
  SettingModelState,
  UserModelState,
  SongModelState,
  PlayModelState,
  MvModelState,
  PlaylistModelState,
  PlayHistoryModelState
};


export interface Dispatch {
  type: string,
  payload?: any
}

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  settings: SettingModelState;
  user: UserModelState;
  song: SongModelState,
  play: PlayModelState,
  mv: MvModelState,
  playlist: PlaylistModelState,
  playHistory: PlayHistoryModelState
}

// export interface Route extends MenuDataItem {
//   routes?: Route[];
// }





