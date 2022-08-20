<template>
  <div class="music-recommend">
    <!-- 轮播图 -->
    <!-- <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel> -->
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
            <div class="singer">{{ item.song.artists[0].name || "" }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐歌单 -->
    <div class="recommend recommend-songlist">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <CallToAction
          class="item"
          v-for="(item, index) in list"
          :key="index"
          :src="item.picUrl"
          :count="item.playCount"
          :title="item.name"
          @click.native="toDetailSongSheet(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/skeleton/image";
import CallToAction from "@/components/CallToAction.vue";

export default {
  name: "recommend",
  components: { CallToAction },
  data() {
    return {
      // 轮播图
      // banners: [],
      // 推荐歌单
      list: new Array(12).fill({
        name: "",
        picUrl: ImagePlaceholder
      }),
      // 独家放送
      contents: [],
      // 最新音乐
      songs: new Array(14).fill({
        name: "",
        picUrl: ImagePlaceholder,
        song: {
          artists: [""]
        }
      }),
      // 推荐mv
      mvs: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getNewSong();
      this.getPersonalized();
    },
    getNewSong() {
      let params = {
        limit: 12
      };
      this.$http.getNewSong(params).then((res) => {
        this.songs = res.data.result;
      });
    },
    getPersonalized() {
      let params = {
        limit: 14
      };
      this.$http.getPersonalized(params).then((res) => {
        this.list = res.data.result;
      });
    },
    toDetailSongSheet(item) {
      if (!item.id) return;
      this.$router.push({
        name: "detailSongSheet",
        query: {
          id: item.id
        }
      });
    },
    getMusic(item) {
      if (item.id) return false;
      this.$store.dispatch("song/getMusic", item);
    }
  }
};
</script>
