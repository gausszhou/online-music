<template>
  <div class="music-recommend">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 最新音乐 -->
    <div class="recommend-news">
      <h3 class="title">最新音乐</h3>
      <div class="news-list">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span
              class="iconfont ft_16 icon-play"
              @click="getMusic(item)"
            ></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend recommend-songlist">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="toDetailSongSheet(item)"
        >
          <div class="item-box img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.name }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 独家放送
      contents: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getBanner();
      this.getPersonalized();
      this.getNewSong();
      this.getNewMV();
      this.getPrivatecontent();
    },
    getBanner() {
      this.$http.getBanner().then((res) => {
        this.banners = res.data.banners;
      });
    },
    getPersonalized() {
      let params = {
        limit: 10
      };
      this.$http.getPersonalized(params).then((res) => {
        this.list = res.data.result;
      });
    },
    getNewSong() {
      let params = {
        limit: 12
      };
      this.$http.getNewSong(params).then((res) => {
        this.songs = res.data.result;
      });
    },
    getNewMV() {
      this.$http.getNewMV().then((res) => {
        this.mvs = res.data.result;
      });
    },
    getPrivatecontent() {
      this.$http.getPrivatecontent().then((res) => {
        this.contents = res.data.result;
      });
    },
    toDetailSongSheet(item) {
      this.$router.push({
        name: "detailSongSheet",
        query: {
          id: item.id
        }
      });
    },
    getMusic(item) {
      this.$store.dispatch("song/getMusic", item);
    },
    toDetailMV(item) {
      this.$router.push({
        name: "detailMV",
        query: {
          mvid: item.id
        }
      });
    }
  }
};
</script>
