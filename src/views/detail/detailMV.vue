<template>
  <div class="video-container video-detail-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrl"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="detail.cover" alt />
          </div>
          <span class="name">{{ detail.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ detail.name }}</h2>
          <span class="date">发布: {{ detail.publishTime }}</span>
          <span class="number"
            >播放: {{ detail.playCount | numbertocount }}次</span
          >
          <p class="desc">{{ detail.desc }}</p>
          <div>
            <span v-for="(item, index) in detail.videoGroup" :key="index">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <Comments title="最新评论" :commentsTotal="total" :comments="comments" />
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="limit"
      ></el-pagination>
    </div>
    <!--  -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <CallToAction
            class="item aspect-16-9"
            v-for="(item, index) in simiMV"
            :key="index"
            @click="playMV(item)"
            :src="item.cover"
            :count="item.playCount"
            :title="item.artistName + item.name && `《${item.name.trim()}》`"
          ></CallToAction>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePlaceholder } from "@/skeleton/image";
import CallToAction from "@/components/CallToAction";
import Comments from "@/components/Comments";

export default {
  name: "mv",
  components: {
    CallToAction,
    Comments
  },
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 20,
      detail: {},
      mvUrl: "",
      simiMV: new Array(8).fill({
        name: "",
        cover: ImagePlaceholder,
        playCount: 99999,
        artistName: ""
      }),
      comments: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.getMVDetail();
      this.getMVUrl();
      this.getSimiMV();
      this.getCommentMV();
    },
    getMVDetail() {
      let params = {
        mvid: this.$route.query.mvid
      };
      this.$http.getMVDetail(params).then((res) => {
        this.detail = res.data.data;
      });
    },
    getMVUrl() {
      let params = {
        id: this.$route.query.mvid
      };
      this.$http.getMVUrl(params).then((res) => {
        this.mvUrl = res.data.data.url;
      });
    },
    getSimiMV() {
      let params = {
        mvid: this.$route.query.mvid
      };
      this.$http.getSimiMV(params).then((res) => {
        this.simiMV = res.data.mvs;
      });
    },
    getCommentMV() {
      let params = {
        id: this.$route.query.mvid,
        limit: this.limit
      };
      this.$http.getCommentMV(params).then((res) => {
        this.comments = res.data.comments;
        this.total = res.data.total;
      });
    },
    playMV(item) {
      this.$route.query.mvid = item.id;
      this.getData();
    },
    handleCurrentChange(val) {
      this.page = val;
    }
  }
};
</script>
