<template>
  <div class="app-main-view">
    <div class="app-main-page search-container">
      <div class="search-title-box">
        <h2 class="search-title-keywords">{{ keywords }}</h2>
        <span class="search-title-count">找到 {{ count }} 个结果</span>
      </div>
      <el-tabs v-model="activeIndex">
        <el-tab-pane label="歌曲" name="songs">
          <el-table :lazy="true" :data="songList" @row-dblclick="getMusic">
            <el-table-column
              type="index"
              label="序号"
              width="50px"
            ></el-table-column>
            <el-table-column prop="name" label="音乐标题" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="artists[0].name"
              label="歌手"
            ></el-table-column>
            <el-table-column
              prop="album.name"
              label="专辑"
              width="250px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="duration" label="时长" width="150px">
              <template slot-scope="scope">
                <span>{{ scope.row.duration | mstotime }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="歌单" name="lists">
          <div class="items">
            <div
              class="item"
              v-for="(item, index) in playList"
              :key="index"
              @click="toSongSheetDetail(item)"
            >
              <div class="img-wrap">
                <div class="num-wrap">
                  <span class="num">{{ item.playCount | numbertocount }}</span>
                </div>
                <img :src="item.coverImgUrl" alt />
                <span class="iconfont icon-play"></span>
              </div>
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mvs">
          <div class="items mv">
            <div
              class="item"
              v-for="(item, index) in mvList"
              :key="index"
              @click="playMV(item)"
            >
              <div class="img-wrap">
                <img :src="item.cover" alt />
                <span class="iconfont icon-play"></span>
                <div class="num-wrap">
                  <div class="iconfont icon-play"></div>
                  <div class="num">{{ item.playCount | numbertocount }}</div>
                </div>
                <span class="time">{{ item.duration | mstotime }}</span>
              </div>
              <div class="info-wrap">
                <div class="name">{{ item.name }}</div>
                <div class="singer">{{ item.artistName }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      activeIndex: "songs",
      keywords: "",
      type: 1,
      songList: [],
      playList: [],
      mvList: [],
      count: ""
    };
  },
  watch: {
    "$store.state.query": {
      handler(newV) {
        this.search();
      }
    },
    activeIndex: {
      handler(newV) {
        switch (newV) {
          case "songs":
            this.type = 1;
            break;
          case "lists":
            this.type = 1000;
            break;
          case "mvs":
            this.type = 1004;
            break;
          default:
            break;
        }
        this.search();
      }
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      this.keywords = this.$route.query.keywords;
      let type = this.type;
      if (this.keywords) {
        let params = {
          keywords: this.keywords,
          type
        };
        this.$http.getSearch(params).then((res) => {
          switch (type) {
            case 1:
              this.songList = res.data.result.songs;
              this.count = res.data.result.songCount;
              break;
            case 1000:
              this.playList = res.data.result.playlists;
              this.count = res.data.result.playlistCount;
              break;
            case 1004:
              this.mvList = res.data.result.mvs;
              this.count = res.data.result.mvCount;
              break;
            default:
              break;
          }
        });
      }
    },
    getMusic(row) {
      this.$store.dispatch("song/getMusic", row);
    },
    toSongSheetDetail(item) {
      this.$router.push({
        name: "detailSongSheet",
        query: {
          id: item.id
        }
      });
    },
    playMV(item) {
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
