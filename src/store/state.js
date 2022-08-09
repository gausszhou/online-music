import local from '@/storage/local'

export default {
  // 提示消息
  message: '',
  // 歌曲对象
  song: local.get('song') || {},
  // 播放列表
  playList: local.get('playList') || [],
  // 当前播放歌曲的序号
  activeIndex: local.get('activeIndex')  || 0,
  // 表示播放状态
  isPlay: false,
  // 查询参数
  query: '',
  // 当前播放列表
  menuVisible: false,
  // 歌词数组
  lyric: []
}
