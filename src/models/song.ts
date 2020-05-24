import {Subscription, Reducer, Effect} from 'umi';
import {
  banner,
  topSong,
  search,
  topList,
  topArtists,
  searchSuggest,
  musicComment,
  lyric,
  simiSong
} from '@/services/song';
import {formatMilliSeconds, formatTime, formatNumToTenThousand} from '@/utils/utils'
import {isEmpty} from 'lodash'


// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手,
// 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合


export enum TypeEnum {
  singles = '1',   // 单曲
  album = '10',  // 专辑
  playList = '1000',   // 歌单
  mv = '1004', // MV
  user = '1002', // 用户
  video = '1014' // 视频
}

export interface TopSongItemProps {
  id: number,
  artists?: string,
  picUrl: string,
  playTime?: number,
  name?: string,
  loading?: boolean,
}

export interface SongsItemProps {
  id: number,
  name: string,
  duration: number,
  playTime: string,
  artists: string[],
  album: string
}

export interface albumItemProps {
  name: string,
  id: number,
  picUrl: string,
  userName: string,
}

export interface PlayListItemProps {
  name: string,
  id: number,
  coverImgUrl: string,
  nickname: string,
  trackCount: number,
  bookCount: number,
  playCount: number
}

export interface VideoItemProps {
  coverUrl: string,
  title: string,
  durations: number,
  playTime: number,
  creator: {
    userId: number,
    userName: number,
  }[],
  vid: number
}

export interface TopListItemProps {
  id: number,
  coverImgUrl?: string,
  description?: string,
  name?: string,
  createTime?: number,
  playCount?: number,
  subscribedCount?: number
  picUrl?: string,
  loading?: boolean,
}

function formatTopSongs(songs: []): Array<TopSongItemProps> {
  return songs.map((item: any) => ({
    id: item.id,
    artists: item.album.artists.map((o: any) => o.name).join(),
    name: item.name,
    picUrl: item.album.picUrl,
    playTime: item.mMusic.playTime
  }))
}

function formatSongs(songs: []): Array<SongsItemProps> {
  return songs.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      playTime: formatMilliSeconds(item.duration),
      duration: item.duration,
      artists:item.artists,
      album: item.album.name
    }
  })
}

function formatAlbums(albums: []): Array<albumItemProps> {
  return albums.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      picUrl: item.picUrl,
      userName: item.artist.name
    }
  })
}

function formatPlayList(playList: []): Array<PlayListItemProps> {
  return playList.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
      coverImgUrl: item.coverImgUrl,
      nickname: item.creator.nickname,
      trackCount: item.trackCount,
      bookCount: item.bookCount,
      playCount: item.playCount
    }
  })
}

function formatTopListItem(data: []): Array<TopListItemProps> {
  return data.map((item: any) => {
    return {
      id: item.id,
      coverImgUrl: item.coverImgUrl,
      description: item.description,
      name: item.name,
      createTime: item.createTime,
      playCount: item.playCount,
      subscribedCount: item.subscribedCount
    }
  }).filter((_, i) => i > 3)
}

function formatComments(comments: []) {
  return comments.map((item: any, index: number) => {
    return {
      ...item,
      time: formatTime(item.time),
      likedCount: formatNumToTenThousand(item.likedCount),
      index
    }
  })
}


const loadingMock: Array<TopSongItemProps> = [
  {
    id: 1001,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1002,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1003,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1004,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1005,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1006,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1007,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1008,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1009,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
  {
    id: 1010,
    picUrl: 'http://acuario.cn/assets/block.png',
    loading: true
  },
]

export interface SongModelState {
  banners: any[],
  topSong: Array<TopSongItemProps>,
  songs: Array<SongsItemProps>,  // 单曲
  albums: Array<albumItemProps>,
  playList: Array<PlayListItemProps>,
  mv: [],
  videos: Array<VideoItemProps>,
  user: [],

  searchLoading: boolean,

  topList: Array<TopListItemProps>
  topArtists: [],

  searchSuggest: {
    order: string[]
  },

  commentData: {
    hotComments: [],
    comments: [],
    total: number,
    songId: number | null,
  }

  lyric: {
    songId: null | number,
    lyr: string
  }

  simiSong: {
    songId: number | null,
    list: any[]
  }
}

export interface SongModelType {
  namespace: 'song';
  state: SongModelState;
  effects: {
    fetchBanner: Effect;
    fetchTopSong: Effect;
    fetchSearch: Effect;
    fetchTopList: Effect;
    fetchTopArtists: Effect;
    fetchSearchSuggest: Effect;
    fetchMusicComment: Effect;
    fetchLyric: Effect;
    fetchSimiSong: Effect;
  };
  reducers: {
    setState: Reducer<SongModelState>;
  };
  subscriptions: { setup: Subscription };
}


const SongModel: SongModelType = {
  namespace: 'song',
  state: {
    banners: [{
      imageUrl: 'http://acuario.cn/assets/block@1080x400.png'
    }],
    topSong: loadingMock,

    // 搜索结果数据
    songs: [], // 歌单
    albums: [],
    playList: [],
    mv: [],
    videos: [],
    user: [],

    searchLoading: false, // 搜索loading

    topList: loadingMock, // 所有榜单

    topArtists: [], // 热门歌手

    searchSuggest: {
      order: []
    },


    commentData: {
      songId: null,
      hotComments: [],
      comments: [],
      total: 0
    },

    lyric: {
      songId: null,
      lyr: ''
    },

    simiSong: {
      songId: null,
      list: []
    }

  },
  effects: {
    * fetchBanner({payload}, {call, put}) {
      const {code, banners} = yield call(banner, payload);

      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {banners},
        });
      }
    },
    * fetchTopSong({payload}, {call, put}) {
      const {code, data} = yield call(topSong, payload);
      const d = yield (data || []).splice(0, 10)
      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {topSong: formatTopSongs(d)},
        });
      }
    },

    * fetchSearch({payload}, {call, put}) {
      const {code, result} = yield call(search, payload);
      if (code && code === 200) {
        const songs = formatSongs(result.songs || []);
        const albums = formatAlbums(result.albums || []);
        const playList = formatPlayList(result.playlists || []);

        yield put({
          type: 'setState',
          payload: {
            songs,
            albums,
            playList,
            videos: result.videos || [],
            searchLoading: false
          },

        });
      }
    },
    * fetchTopList({payload}, {call, put}) {
      const {code, list: lt} = yield call(topList, payload);

      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {topList: formatTopListItem(lt || [])},
        });
      }
    },
    * fetchTopArtists({payload}, {call, put}) {
      const {code, artists} = yield call(topArtists, payload);

      if (code && code === 200) {
        yield put({
          type: 'setState',
          payload: {topArtists: artists || []},
        });
      }
    },

    * fetchSearchSuggest({payload}, {call, put}) {
      const {code, result} = yield call(searchSuggest, payload.keywords);

      if (code && code === 200) {
        const d = !result || isEmpty(result) ? {order: []} : result
        yield put({
          type: 'setState',
          payload: {searchSuggest: d},
        });
      }
    },
    * fetchMusicComment({payload}, {call, put}) {
      const {code, total, hotComments, comments} = yield call(musicComment, payload);

      if (code === 200) {
        yield put({
          type: 'setState',
          payload: {
            commentData: {
              songId: payload.id,
              total: formatNumToTenThousand(total || 0),
              hotComments: formatComments(hotComments || []),
              comments: formatComments(comments || [])
            }
          },
        });
      }
    },
    * fetchLyric({payload}, {call, put}) {
      const {code, lrc} = yield call(lyric, payload.id);

      if (code === 200) {
        yield put({
          type: 'setState',
          payload: {
            lyric: {
              songId: payload.id,
              lyr: lrc ? (lrc.lyric || '') : ''
            },
          },
        });
      }
    },
    * fetchSimiSong({payload}, {call, put}) {
      const {code, songs} = yield call(simiSong, payload.id);

      if (code === 200 && Array.isArray(songs)) {
        yield put({
          type: 'setState',
          payload: {
            simiSong: {
              songId: payload.id,
              list: songs.map((o: any) => ({
                name: o.name,
                id: o.id,
                artists: o.artists.map((i: any) => i.name).join('/')
              }))
            }
          },
        });
      }
    },
  },
  reducers: {
    setState(state, {payload}): SongModelState {
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
export default SongModel
