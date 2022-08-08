// 引入axios
import axios from 'axios';
// 超时设置
axios.defaults.setTimeout == 5000;
// Post请求，默认类型
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Get请求参数拼接
function serialize(params) {
  if (!params || Object.prototype.toString.call(params) != "[object Object]") {
    return "";
  }
  let str = "?",
    keys = Object.keys(params);
  keys.forEach(k => {
    if (Object.prototype.toString.call(params[k]) === "[object Object]" || Object.prototype.toString.call(params[k]) ===
      "[object Array]") {
      str += k + "=" + JSON.stringify(params[k]) + "&";
    } else {
      str += k + "=" + params[k] + "&";
    }
  });
  return str.substr(0, str.length - 1);
}

// API接口服务器地址

let baseUrl;
let serverUrl = 'https://api.gausszhou.top/music/';
let localUrl = 'http://localhost:3000';


if (process.env.NODE_ENV == 'development') {
  baseUrl = localUrl
} else {
  baseUrl = serverUrl
}
baseUrl = serverUrl

const http = {
  // 登录
  login: (params) => axios.get(baseUrl + '/login/cellphone' + serialize(params)),
  /* 通用方法 */
  // 获取歌曲地址 /song/url id
  getSongUrl: (params) => axios.get(baseUrl + '/song/url' + serialize(params)),
  // 获取歌曲详情 /song/detail?ids=347230,347231
  getSongDetail: (params) => axios.get(baseUrl + '/song/detail' + serialize(params)),
  // 获取MV视频地址 /mv/url id
  getMVUrl: (params) => axios.get(baseUrl + '/mv/url' + serialize(params)),
  // 获取MV详情 /mv/detail mvid
  getMVDetail: (params) => axios.get(baseUrl + '/mv/detail' + serialize(params)),
  // 获取歌词 /lyric id
  getLyric: (params) => axios.get(baseUrl + '/lyric' + serialize(params)),

  /* 顶部搜索 */
  // 获取搜索列表 /search
  getSearch: (params) => axios.get(baseUrl + '/search' + serialize(params)),

  /* 发现音乐 */
  // 发现音乐-个性推荐
  // 获取轮播图 /banner
  getBanner: (params) => axios.get(baseUrl + '/banner' + serialize(params)),
  // 获取推荐歌单/personalized
  getPersonalized: (params) => axios.get(baseUrl + '/personalized' + serialize(params)),
  // 获取独家放送 /personalized/privatecontent
  getPrivatecontent: (params) => axios.get(baseUrl + '/personalized/privatecontent' + serialize(params)),
  // 获取最新音乐 /personalized/newsong
  getNewSong: (params) => axios.get(baseUrl + '/personalized/newsong' + serialize(params)),
  // 获取最新MV /personalized/mv
  getNewMV: (params) => axios.get(baseUrl + '/personalized/mv' + serialize(params)),

  // 发现音乐-歌单
  // 获取精品歌单 /top/playlist/highquality
  getTopPlayListDetail: (params) => axios.get(baseUrl + '/top/playlist/highquality' + serialize(params)),
  // 获取歌单列表 /top/playlist
  getTopPlayList: (params) => axios.get(baseUrl + '/top/playlist' + serialize(params)),

  // 发现音乐-主播电台
  // 获取轮播图 /dj/banner
  getDJBanner: (params) => axios.get(baseUrl + '/dj/banner' + serialize(params)),
  // 电台个性推荐 /dj/personalize/recommend
  getDJRecommend: (params) => axios.get(baseUrl + '/dj/personalize/recommend' + serialize(params)),

  // 发现音乐-排行榜 /toplist
  getTopList: (params) => axios.get(baseUrl + '/toplist' + serialize(params)),

  // 发现音乐-歌手 
  // 获取歌手列表 /artist/list  offset limit type  area
  getArtistList: (params) => axios.get(baseUrl + '/artist/list' + serialize(params)),

  // 发现音乐-最新音乐
  // 获取新歌速递 /top/song
  getTopSong: (params) => axios.get(baseUrl + '/top/song' + serialize(params)),

  /* 发现视频 */
  getMVFirst: (params) => axios.get(baseUrl + '/mv/first' + serialize(params)),
  // 获取所有MV
  getMVAll: (params) => axios.get(baseUrl + '/mv/all' + serialize(params)),


  // MV详情

  // 获取相似MV /simi/mv mvid
  getSimiMV: (params) => axios.get(baseUrl + '/simi/mv' + serialize(params)),
  // 获取MV评论  /comment/mv
  getCommentMV: (params) => axios.get(baseUrl + '/comment/mv' + serialize(params)),

  // 歌单详情 /playlist/detail id
  getPlayListDetail: (params) => axios.get(baseUrl + '/playlist/detail' + serialize(params)),

  // 获取歌单评论 /comment/playlist
  getCommentPlayList: (params) => axios.get(baseUrl + '/comment/playlist' + serialize(params)),
  // 获取热门评论  /comment/hot
  getCommentHot: (params) => axios.get(baseUrl + '/comment/hot' + serialize(params)),

};

export default http;