<template>
  <div class="songlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <p class="title">
          <span class="title-label">歌单</span>
          <span class="title-text">{{ playlist.name }}</span>
        </p>
        <div class="author-wrap">
          <img class="author-avatar" :src="playlist.creator.avatarUrl" alt />
          <span class="name">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ createTime }} 创建</span>
        </div>
        <div class="play-wrap" @click="addToSongList">
          <span class="iconfont icon-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <!--  -->

    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <el-table :lazy="true" :data="tracksShow" @row-click="getMusic">
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="歌手">
            <template slot-scope="scope">
              <span>{{ scope.row.ar[0].name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="专辑" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.al.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">
              <span>{{ scope.row.dt | mstotime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleSongsPagesChange"
          background
          layout="prev, pager, next"
          :total="songstotal"
          :current-page="songspage"
          :page-size="songslimit"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane :label="'评论(' + commentsTotal + ')'" name="2">
        <Comments
          title="最新评论"
          :commentsTotal="commentsTotal"
          :comments="comments"
        />
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCommentsPagesChange"
          background
          layout="prev, pager, next"
          :total="commentsTotal"
          :current-page="commentsPage"
          :page-size="commentsLimit"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/skeleton/image";
import Comments from "@/components/Comments";

export default {
  name: "playlist",
  components: {
    Comments
  },
  data() {
    return {
      activeIndex: "1",
      songstotal: 0,
      songslimit: 20,
      songspage: 1,
      commentsTotal: 0,
      commentsLimit: 10,
      commentsPage: 1,
      id: "",
      playlist: {
        creator: {
          avatarUrl: ImagePlaceholder
        },
        coverImgUrl: ImagePlaceholder,
        createTime: "000"
      },
      tracks: new Array(20).fill({
        name: "",
        ar: [{ name: "" }],
        al: { name: "" },
        dt: 0
      }),
      comments: []
    };
  },
  computed: {
    tracksShow() {
      return this.tracks.slice(
        (this.songspage - 1) * this.songslimit,
        this.songspage * this.songslimit
      );
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
        id: this.$route.query.id
      };
      this.$http.getPlayListDetail(params).then((res) => {
        this.playlist = res.data.playlist;
        this.tracks = this.playlist.tracks;
        this.songstotal = this.tracks.length;
      });
    },
    getCommentPlayList() {
      let params = {
        id: this.$route.query.id,
        type: 0,
        limit: this.commentsLimit,
        offset: (this.commentsPage - 1) * this.commentsLimit
      };
      this.$http.getCommentPlayList(params).then((res) => {
        this.comments = res.data.comments;
        this.commentsTotal = res.data.total;
      });
    },
    handleSongsPagesChange(val) {
      this.songspage = val;
      this.getPlayListDetail();
    },
    handleCommentsPagesChange(val) {
      this.commentsPage = val;
      this.getCommentPlayList();
    },
    addToSongList() {
      this.$store.commit("song/addListToSongList", this.tracks);
    },
    getMusic(item) {
      if (!item.id) return false;
      this.$store.dispatch("song/getMusic", item);
    }
  }
};
</script>

<style></style>
