import http from '@/api/http'
import { musicPolyfill } from '../utils/tools'
//导入
import NProgress from 'nprogress'
// 关闭加载小圈圈的显示
NProgress.configure({ showSpinner: false })
// NProgress.start()
// NProgress.done()

export default {
  async getMusic(store, payload) {
    NProgress.start()
    let song
    let { name, albumname, picUrl, audioUrl, author, musicId } = (song =
      musicPolyfill(payload))
    console.log(song)
    // pause
    store.commit('setIsPlay', false)
    const resSong = await http.getSongUrl({ id: musicId })
    if (resSong.data.data && resSong.data.data[0].url) {
      audioUrl = resSong.data.data[0].url
      const resLyric = await http.getLyric({ id: musicId })
      let lyric = resLyric.data.lrc.lyric
      store.commit('setLyric', lyric)
    }
    // 如果没有传递图片地址，则根据 musicId 主动获取
    if (!(picUrl && albumname)) {
      const resDetail = await http.getSongDetail({ ids: musicId })
      if (resDetail.data.songs && resDetail.data.songs[0]) {
        albumname = resDetail.data.songs[0].al.name
        picUrl = resDetail.data.songs[0].al.picUrl
        author = resDetail.data.songs[0].ar
      }
    }
    song = { name, albumname, picUrl, audioUrl, author, musicId }
    let list = JSON.parse(JSON.stringify(store.state.playList))
    let flag = true
    // 去重检查
    list.forEach((item, index) => {
      if (item.musicId == song.musicId) {
        flag = false
        store.commit('setIndex', index)
        store.commit('setProgress', 0)
      }
    })
    // 添加
    if (flag && audioUrl) {
      list.push(song)
      store.commit('setIndex', list.length - 1)
      store.commit('setProgress', 0)
    }
    if (audioUrl) {
      store.commit('setSong', song)
      store.commit('setPlayList', list)
      store.commit('setIsPlay', true)
    }
    NProgress.done()
  },
  playMusicAll(store, tracks) {
    if (tracks.constructor != Array) return
    let list_new = tracks.map((track) => {
      return musicPolyfill(track)
    })
    let list = JSON.parse(JSON.stringify(store.state.playList))
    list.push(...list_new)
    let map = {}
    list = list.filter((item) => {
      if (map[item.musicId] == true) return false
      map[item.musicId] = true
      return true
    })
    store.commit('setPlayList', list)
  }
}
