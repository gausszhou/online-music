<template>
  <div class="station-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in DJBanners" :key="index">
        <img :src="item.pic" alt />
      </el-carousel-item>
    </el-carousel>
    <!--  电台个性推荐 -->
    <div class="recommend">
      <h3 class="title">电台个性推荐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.name }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.rcmdText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'anchorStation',
  data() {
    return {
      // 轮播图
      DJBanners: [],
      // 电台个性推荐
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: []
    };
  },
  created() {
    //  获取轮播图
    this.getDJBanner();
    this.getDJRecommend();
  },
  methods: {
    getDJBanner() {
      this.$http.getDJBanner().then(res => {
        this.DJBanners = res.data.data;
      });
    },
    getDJRecommend() {
      let params = {
        limit: 6
      };
      this.$http.getDJRecommend(params).then(res => {
        this.list = res.data.data.slice(0, 5);
      });
    },

  }
}
</script>

