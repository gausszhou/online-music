<template>
  <div class="app-main-view">
    <div class="app-main-page search-container">
      <div class="search-header display-flex">
        <div class="search-title-box">
          <h2 class="search-title-keywords">{{ keywords }}</h2>
          <span class="search-title-count">找到 {{ count }} 个结果</span>
        </div>
        <div
          class="play-wrap"
          @click="addToSongList"
          v-if="activeIndex == 'songs'"
        >
          <span class="iconfont icon-play"></span>
          <span class="text">播放全部</span>
        </div>
      </div>
      <el-tabs v-model="activeIndex">
        <el-tab-pane label="歌曲" name="songs">
          <el-table
            :lazy="true"
            :data="songList"
            v-loading="loading"
            @row-dblclick="getMusic"
          >
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
            <CallToAction
              class="item"
              v-for="(item, index) in playList"
              :key="index"
              :src="item.coverImgUrl"
              :count="item.playCount"
              :title="item.name"
              @click.native="toDetailSongSheet(item)"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mvs">
          <div class="items mv">
            <CallToAction
              class="item aspect-16-9"
              v-for="(item, index) in mvList"
              :key="index"
              :src="item.cover"
              :count="item.playCount"
              :title="item.artistName + item.name && `《${item.name.trim()}》`"
              @click.native="toDetailMV(item)"
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="prev, pager, next, sizes"
        :total="total"
        :current-page="page"
        :page-size="limit"
        :page-sizes="[10, 20, 30]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/skeleton/image";
import CallToAction from "@/components/CallToAction.vue";
export default {
  name: "search",
  components: {
    CallToAction
  },
  data() {
    return {
      count: 999,
      total: 999,
      page: 1,
      limit: 10,
      activeIndex: "songs",
      keywords: "",
      type: 1,
      songList: new Array(20).fill({
        name: "",
        album: {
          name: ""
        },
        artists: [{ name: "" }],
        duration: 0
      }),
      playList: new Array(20).fill({
        name: "",
        coverImgUrl: ImagePlaceholder,
        playCount: 999999
      }),
      mvList: new Array(8).fill({
        name: "",
        cover: ImagePlaceholder,
        playCount: 99999,
        artistName: ""
      }),
      loading: true
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
      this.loading = true;
      let type = this.type;
      if (this.keywords) {
        let params = {
          keywords: this.keywords,
          type,
          limit: this.limit,
          offset: this.limit * (this.page - 1)
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
          this.total = this.count;
          this.loading = false;
        });
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.search();
    },
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    addToSongList() {
      this.$store.commit("song/addListToSongList", this.songList);
    },
    getMusic(item) {
      if (item.id) return false;
      this.$store.dispatch("song/getMusic", item);
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
