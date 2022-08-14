import local from '@/storage/local'

export default {
  // 查询参数 路由不变时 通过此参数传递变化
  query: '',
  // 播放列表
  playList: local.get('playList') || [],
  // 歌曲对象
  song: local.get('song') || {},
  // 当前播放歌曲的序号
  activeIndex: local.get('activeIndex') || 0,
  // 表示播放状态
  isPlay: false,
  // 播放长度百分比
  progress: 0,
  // 当前播放列表
  menuVisible: false,
  // 歌词数组
  lyric:local.get('lyric') || []
}