<template>
  <div class="video-container display-flex">
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
      <div class="comment-wrap">
        <p class="title">
          最新评论
          <span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">&nbsp;&nbsp;{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length">
                <span class="name">@{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | timestamp }}</div>
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
    </div>
    <!--  -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            class="item"
            v-for="(item, index) in simiMV"
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
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
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
      simiMV: [],
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
