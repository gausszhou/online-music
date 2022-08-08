<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <p class="title">{{playlist.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlist.creator.avatarUrl" alt />
          <span class="name">{{playlist.creator.nickname}}</span>
          <span class="time">{{createTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in playlist.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{playlist.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlist-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in tracksShow" :key="index">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt />
                  <span class="iconfont icon-play" @click="getMusic(item)"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span v-if="item.mv" class="iconfont mv-tag icon-mv" @click="playMV(item)">MV</span>
                  </div>
                </div>
              </td>
              <!-- <td></td> -->
              <td>{{item.al.name}}</td>
              <td>{{item.dt | mstotime}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChangesongs"
          background
          layout="prev, pager, next"
          :total="songstotal"
          :current-page="songspage"
          :page-size="songslimit"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane :label="'评论('+total+')'" name="2">
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">({{total}})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in comments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}</span>
                  <span class="comment">&nbsp;&nbsp;{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length">
                  <span class="name">@{{item.beReplied[0].user.nickname}}</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{item.time | timestamp}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="limit"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      songstotal: 0,
      songslimit: 10,
      songspage: 1,
      total: 0,
      limit: 10,
      page: 1,
      id: '',
      playlist: {
        creator: {},
        createTime: '000'
      },
      tracks: [],
      comments: [],
    };
  },
  computed: {
    tracksShow() {
      return this.tracks.slice((this.songspage - 1) * this.songslimit, this.songspage * this.songslimit);
    },
    createTime() {
      return new Date(this.playlist.createTime).toISOString().slice(0, 10);
    }
  },
  created() {
    this.getPlayListDetail();
    this.getCommentPlayList();
  },
  methods: {
    getPlayListDetail() {
      let params = {
        id: this.$route.query.id,
      };
      this.$http.getPlayListDetail(params).then(res => {
        this.playlist = res.data.playlist;
        this.tracks = this.playlist.tracks;
        this.songstotal = this.tracks.length;
      });
    },
    getCommentPlayList() {
      let params = {
        id: this.$route.query.id,
        type: 0,
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
      };
      this.$http.getCommentPlayList(params).then(res => {
        this.comments = res.data.comments;
        this.total = res.data.total;
      });
    },
    playMV(item) {
      this.$router.push({
        name: 'detailMV',
        query: {
          mvid: item.mv
        }
      });
    },
    getMusic(item) {
      this.$store.dispatch('getMusic', item);
    },
    handleCurrentChangesongs(val) {
      this.songspage = val;
      this.getPlayListDetail();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCommentPlayList();
    }
  }
};
</script>

<style >
</style>
