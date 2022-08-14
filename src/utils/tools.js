const tools = {
  //  暂时留着，一些过滤器用不了的地方就来调用这里的方法
};

export function musicPolyfill(payload){
  let name = payload.name
  let albumname = payload.albumname ||  payload.al && payload.al.name || ''
  let picUrl = payload.picUrl || ''
  let audioUrl = ''
  let author = payload.author && [payload.author] || payload.ar
  let musicId = payload.musicId || payload.id
  let song = { name, albumname, picUrl, audioUrl, author, musicId }
  return song
}

export default tools;