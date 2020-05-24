import request from '@/utils/request';

// 歌曲（音乐）是否可用
export async function checkMusic(id: number): Promise<any> {
  return request(`http://106.12.40.19:3000/check/music?id=${id}`);
}

// 歌曲详情
export async function songDetail(ids: number | string): Promise<any> {
  return request(`http://106.12.40.19:3000/song/detail?ids=${ids}`);
}

// banner
// 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
// 可选参数 :
// type:资源类型,对应以下类型,默认为 0 即PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
// 接口地址 : /banner
// 调用例子 : /banner, /banner?type=2

export async function banner(type = '0'): Promise<any> {
  return request(`http://106.12.40.19:3000/banner?type=${type}&limit=10`);
}


// 新歌速递
// 说明 : 调用此接口 , 可获取新歌速递
// 必选参数 :
//   type: 地区类型 id,对应以下:
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16
// 接口地址 : /top/song
// 调用例子 : /top/song?type=96

export async function topSong(type = '7'): Promise<any> {
  return request(`http://106.12.40.19:3000/top/song?type=${type}&limit=10`);
}


// 获取音乐 url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 ,
// 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
// 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的 解决方案是当获取到音乐的 id 后，
// 将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
//   必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /song/url
// 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312

export async function songUrl(id: number): Promise<any> {
  return request(`http://106.12.40.19:3000/song/url?id=${id}`);
}

// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 ,
// 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 ,
// 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : keywords : 关键词
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 ,
// 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手,
// 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
//
// 接口地址 : /search
//
// 调用例子 : /search?keywords= 海阔天空

export async function search({keywords = '', limit = 30, offset = 0, type = 1}): Promise<any> {
  return request(`http://106.12.40.19:3000/search`, {
    method: 'GET',
    params: {
      keywords, limit, offset, type
    },
  });
}

type TopMvParams = {
  limit?: number, area?: string, offset?: number
}

export async function topMv(params: TopMvParams): Promise<any> {
  return request(`http://106.12.40.19:3000/top/mv`, {
    method: 'GET',
    params
  });
}

// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 可选参数 : id: mv id
// 接口地址 : /mv/url
// 调用例子 : /mv/url?id=5436712
export async function mvUrl(id: number): Promise<any> {
  return request(`http://106.12.40.19:3000/mv/url`, {
    method: 'GET',
    params: {id}
  });
}


// 所有榜单
// 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
// 调用例子 : /toplist
export async function topList(): Promise<any> {
  return request(`http://106.12.40.19:3000/toplist`);
}

export async function topListById(idx: string): Promise<any> {
  return request(`http://106.12.40.19:3000/top/list?idx=${idx}`);
}

// 热门歌手
// 说明 : 调用此接口 , 可获取热门歌手数据
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /top/artists
// 调用例子 : /top/artists?offset=0&limit=30
export async function topArtists(payload: { limit: number, offset: number }): Promise<any> {
  return request(`http://106.12.40.19:3000/top/artists`, {
    method: 'GET',
    params: payload
  });
}

export async function searchSuggest(keywords = ''): Promise<any> {
  return request(`http://106.12.40.19:3000/search/suggest?keywords=${keywords}`);
}

// 歌曲评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要 登录 )
// 必选参数 : id: 音乐 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
export async function musicComment(payload: any): Promise<any> {
  return request(`http://106.12.40.19:3000/comment/music`, {
    method: 'GET',
    params: payload
  });
}

export async function lyric(id: number): Promise<any> {
  return request(`http://106.12.40.19:3000/lyric?id=${id}`);
}

export async function simiSong(id: number): Promise<any> {
  return request(`http://106.12.40.19:3000/simi/song?id=${id}`);
}

export async function playlistDetail(id: number | string): Promise<any> {
  return request(`http://106.12.40.19:3000/playlist/detail?id=${id}`);
}





