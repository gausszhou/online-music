<template>
  <div class="songlist-container">
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="topList.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <div class="tag" @click="toSongSheetDetail(topList)">精品歌单</div>
        <div class="title">{{ topList.name }}</div>
      </div>
      <img :src="topList.coverImgUrl" alt class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          v-for="(item, index) in tagList"
          :key="index"
          class="item"
          :class="{ active: tag == item }"
          @click="tag = item"
          >{{ item }}</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <CallToAction
            class="item"
            v-for="(item, index) in list"
            :key="index"
            :src="item.coverImgUrl"
            :count="item.playCount"
            :title="item.name"
            @click.native="toDetailSongSheet(item)"
          />
        </div>
      </div>
    </div>
    <!-- 分页器-->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="limit"
    ></el-pagination>
  </div>
</template>

<script>
import { rect1_1 } from "../../skeleton/image";
import CallToAction from "../../components/CallToAction.vue";
export default {
  name: "songSheet",
  components: {
    CallToAction
  },
  data() {
    return {
      // 标签列表
      tagList: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行"
      ],
      // 当前选中，默认为全部
      tag: "全部",
      // 总条数
      total: 0,
      // 每页条数
      limit: 20,
      // 页码
      page: 1,
      // 顶部的推荐歌单
      topList: {
        name: "",
        coverImgUrl: rect1_1
      },
      // 歌单列表
      list: new Array(20).fill({
        name: "",
        coverImgUrl: rect1_1,
        playCount: 999999
      })
    };
  },
  watch: {
    tag() {
      this.getTopPlayListDetail();
      this.getTopPlayList();
      this.page = 1;
    }
  },
  created() {
    this.getTopPlayListDetail();
    this.getTopPlayList();
  },
  methods: {
    getTopPlayListDetail() {
      let params = {
        limit: 1,
        cat: this.tag
      };
      this.$http.getTopPlayListDetail(params).then((res) => {
        this.topList = res.data.playlists[0];
      });
    },
    getTopPlayList() {
      let params = {
        limit: this.limit,
        offset: (this.page - 1) * this.limit,
        cat: this.tag
      };
      this.$http.getTopPlayList(params).then((res) => {
        this.total = res.data.total;
        this.list = res.data.playlists;
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
    handleCurrentChange(val) {
      this.page = val;
      this.getTopPlayList();
    }
  }
};
</script>
