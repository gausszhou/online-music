<template>
  <div class="songlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="artist.cover" alt />
      </div>
      <div class="info-wrap">
        <p class="title">
          <!-- <span class="title-label"></span> -->
          <span class="title-text">{{ artist.name }}</span>
        </p>
        <div class="prod-wrap">
          <span class="prod-size music-size"
            >单曲数: {{ artist.musicSize }}</span
          >
          <span class="prod-size album-size"
            >专辑数: {{ artist.albumSize }}</span
          >
          <span class="prod-size mv-size">MV数: {{ artist.mvSize }}</span>
        </div>
        <div class="desc-wrap">
          <span class="desc text-over-elli-6"
            >简介: {{ artist.briefDesc }}</span
          >
        </div>
      </div>
    </div>
    <!--  -->
    <el-tabs v-model="activeIndex" @tab-click="onTabClick">
      <el-tab-pane label="专辑" name="1">
        <el-table
          :lazy="true"
          :data="songs"
          v-loading="loading"
          @row-click="getMusic"
        >
          <el-table-column type="index" label="序号" width="50px">
          </el-table-column>
          <el-table-column label="标题" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">
              <span>{{ scope.row.dt | mstotime }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="MV" name="2">
        <div class="video-container">
          <div class="mv-container">
            <div class="mvs">
              <div class="items">
                <CallToAction
                  class="item aspect-16-9"
                  v-for="(item, index) in mvs"
                  :key="index"
                  @click.native="toDetailMV(item)"
                  :src="item.imgurl16v9"
                  :count="item.playCount"
                  :title="
                    item.artistName + item.name && `《${item.name.trim()}》`
                  "
                ></CallToAction>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/skeleton/image";

import CallToAction from "@/components/CallToAction";
export default {
  name: "playlist",
  components: {
    CallToAction
  },
  data() {
    return {
      activeIndex: "1",
      artist: {
        cover: ImagePlaceholder
      },
      loading: false,
      songs: new Array(50).fill({
        name: "",
        dt: 0
      }),
      mvs: []
    };
  },
  created() {
    this.getArtistDetail();
    this.getArtistTopSong();
    this.getArtistMV();
    this.activeIndex = this.$route.query.tab || "1";
  },
  methods: {
    onTabClick() {
      this.$router.replace({
        name: this.$route.name,
        query: {
          id: this.$route.query.id,
          tab: this.activeIndex
        }
      });
    },
    getArtistDetail() {
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistDetail(params).then((res) => {
        this.artist = res.data.data.artist;
      });
    },
    getArtistTopSong() {
      this.loading = true;
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistTopSong(params).then((res) => {
        this.loading = false;
        this.songs = res.data.songs;
      });
    },
    getArtistMV() {
      let id = this.$route.query.id;
      let params = { id };
      this.$http.getArtistMV(params).then((res) => {
        this.mvs = res.data.mvs;
        console.log(this.mvs);
      });
    },
    toDetailMV(item) {
      this.$router.push({
        name: "detailMV",
        query: {
          mvid: item.id
        }
      });
    },
    addToSongList() {
      this.$store.commit("song/addListToSongList", this.tracks);
    },
    getMusic(item) {
            if(item.id) return false
      this.$store.dispatch("song/getMusic", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.prod-wrap {
  padding-bottom: 1rem;
  .prod-size {
    margin-right: 1rem;
    font-size: 14px;
    color: #333;
  }
}
</style>
