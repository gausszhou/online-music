const tools = {};

export function musicPolyfill(payload) {
  let musicId = payload.musicId || payload.id;
  let name = payload.name || "";
  let author = (payload.author && [payload.author]) || payload.ar;
  let albumName =
    payload.albumName ||
    payload.albumname ||
    (payload.al && payload.al.name) ||
    "";
  let picUrl = payload.picUrl || "";
  let audioUrl = "";
  let audioUrlOrigin = "";
  let audioUrlProxy = "";
  let lyricList = payload.lyricList || [];
  let song = {
    musicId,
    name,
    author,
    albumName,
    picUrl,
    audioUrl,
    audioUrlOrigin,
    audioUrlProxy,
    lyricList
  };
  return song;
}
export function processLyric(payload) {
  let arr = payload.split("\n");
  let reg = /^\[.*]/;
  let list = arr.map((item) => {
    let time =
      (item.match(reg) &&
        item.match(reg)[0] &&
        item.match(reg)[0].slice(1, -1)) ||
      null;
    if (time) {
      let timeArr = time.split(":");
      time = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]); // 转化为秒钟
      return {
        time,
        word: item.split(reg)[1]
      };
    } else {
      return {
        time: 9999,
        word: ""
      };
    }
  });
  const lyricList = list.filter((item) => item.word != "");
  return lyricList;
}
export default tools;
