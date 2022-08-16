## NeteaseCloudMusicVue

预览地址: [传送门](http://music.gausszhou.top/netease/)  
 
## TodoList

- [x] 推荐页面，歌单，歌手，排行，最新音乐
- [x] 最小MV，所有MV
- [x] 歌单详情（歌单详情和排行榜复用此页面）
- [ ] 歌手详情
- [x] MV 详情
- [x] 浮动桌面歌词
- [x] 歌曲展开页
- [x] 歌曲展开页-唱片机
- [x] 歌曲展开页-歌词滚动
- [ ] 歌曲展开页-音乐可视化（存在跨域问题 已通过跨域解决）
- [ ] 歌曲展开页-展示用户评论（抽离单独评论组件）
- [x] 音量控制，循环，单曲，顺序，列表播放
- [x] 播放列表，进度条，歌曲切换
- [x] 播放全部，将当前列表的歌曲都加进播放列表
- [x] 修改插入逻辑，点击的歌曲插入到播放列表的头部
- [ ] 重构歌曲播放逻辑为单独的类
- [ ] 移动端示例

## Deploy


```bash
git clone <this-project-url> --depth=1 netease-cloud-music-vue
cd netease-cloud-music-vue
```

```bash
touch .env
```

```yaml
VUE_APP_API="your netease-cloud-music-api path"
```

```bash
docker build -t netease-cloud-music-vue .
```

```bash
docker run -d \
--name netease-cloud-music-vue \
-p 9000:80 \
-v $PWD/nginx.conf:/etc/nginx/nginx.conf \
netease-cloud-music-vue
```
