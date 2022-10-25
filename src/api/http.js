import { serialize, get } from './axios-http';

// API接口服务器地址
const baseUrl = process.env.VUE_APP_API;

const http = {
  // 登录
  login: (params) => get(baseUrl + '/login/cellphone' + serialize(params)),

  /* 通用方法 */
  // 获取歌曲地址 /song/url id
  getSongUrl: (params) => get(baseUrl + '/song/url' + serialize(params)),
  // 获取歌曲详情 /song/detail?ids=347230,347231
  getSongDetail: (params) => get(baseUrl + '/song/detail' + serialize(params)),
  // 获取MV视频地址 /mv/url id
  getMVUrl: (params) => get(baseUrl + '/mv/url' + serialize(params)),
  // 获取MV详情 /mv/detail mvid
  getMVDetail: (params) => get(baseUrl + '/mv/detail' + serialize(params)),
  // 获取歌词 /lyric id
  getLyric: (params) => get(baseUrl + '/lyric' + serialize(params)),

  /* 顶部搜索 */
  // 获取搜索列表 /search
  getSearch: (params) => get(baseUrl + '/search' + serialize(params)),

  /* 发现音乐 */
  // 发现音乐-个性推荐
  // 获取轮播图 /banner
  getBanner: (params) => get(baseUrl + '/banner' + serialize(params)),
  // 获取推荐歌单/personalized
  getPersonalized: (params) =>
    get(baseUrl + '/personalized' + serialize(params)),
  // 获取独家放送 /personalized/privatecontent
  getPrivatecontent: (params) =>
    get(baseUrl + '/personalized/privatecontent' + serialize(params)),
  // 获取最新音乐 /personalized/newsong
  getNewSong: (params) =>
    get(baseUrl + '/personalized/newsong' + serialize(params)),
  // 获取最新MV /personalized/mv
  getNewMV: (params) => get(baseUrl + '/personalized/mv' + serialize(params)),

  // 发现音乐-歌单
  // 获取精品歌单 /top/playlist/highquality
  getTopPlayListDetail: (params) =>
    get(baseUrl + '/top/playlist/highquality' + serialize(params)),
  // 获取歌单列表 /top/playlist
  getTopPlayList: (params) =>
    get(baseUrl + '/top/playlist' + serialize(params)),

  // 发现音乐-主播电台
  // 获取轮播图 /dj/banner
  getDJBanner: (params) => get(baseUrl + '/dj/banner' + serialize(params)),
  // 电台个性推荐 /dj/personalize/recommend
  getDJRecommend: (params) =>
    get(baseUrl + '/dj/personalize/recommend' + serialize(params)),

  // 发现音乐-排行榜 /toplist
  getTopList: (params) => get(baseUrl + '/toplist' + serialize(params)),

  // 发现音乐-歌手
  // 获取歌手列表 /artist/list  offset limit type  area
  getArtistList: (params) => get(baseUrl + '/artist/list' + serialize(params)),

  // 发现音乐-最新音乐
  // 获取新歌速递 /top/song
  getTopSong: (params) => get(baseUrl + '/top/song' + serialize(params)),

  /* 发现视频 */
  getMVFirst: (params) => get(baseUrl + '/mv/first' + serialize(params)),
  // 获取所有MV
  getMVAll: (params) => get(baseUrl + '/mv/all' + serialize(params)),

  // MV详情

  // 获取相似MV /simi/mv mvid
  getSimiMV: (params) => get(baseUrl + '/simi/mv' + serialize(params)),

  // 获取MV评论  /comment/mv
  getCommentMV: (params) => get(baseUrl + '/comment/mv' + serialize(params)),

  // 歌单详情 /playlist/detail id
  getPlayListDetail: (params) =>
    get(baseUrl + '/playlist/detail' + serialize(params)),

  // 获取歌单评论 /comment/playlist
  getCommentPlayList: (params) =>
    get(baseUrl + '/comment/playlist' + serialize(params)),
  // 获取热门评论  /comment/hot
  getCommentHot: (params) => get(baseUrl + '/comment/hot' + serialize(params)),

  // /comment/music?id=186016&limit=1
  getCommentByMusic: (params) =>
    get(baseUrl + '/comment/music' + serialize(params)),
  // /artist/desc?id=6452
  getArtistDesc: (params) => get(baseUrl + '/artist/desc' + serialize(params)),
  getArtistTopSong: (params) =>
    get(baseUrl + '/artist/top/song' + serialize(params)),
  // /artist/mv?id=6452
  getArtistMV: (params) => get(baseUrl + '/artist/mv' + serialize(params)),
  getArtistDetail: (params) =>
    get(baseUrl + '/artist/detail' + serialize(params))
};

export default http;
