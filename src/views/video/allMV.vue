<template>
  <div class="all-mv-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in areaList" :key="index">
            <span
              class="title"
              :class="{ active: area == item }"
              @click="area = item"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in typeList" :key="index">
            <span
              class="title"
              :class="{ active: type == item }"
              @click="type = item"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab" v-for="(item, index) in orderList" :key="index">
            <span
              class="title"
              :class="{ active: order == item }"
              @click="order = item"
              >{{ item }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- MV容器 -->
    <div class="mvs">
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="playMV(item)"
        >
          <div class="img-wrap">
            <img :src="item.cover" alt />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | numbertocount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
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
        :page-size="5"
        :limit="limit"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "allMV",
  data() {
    return {
      areaList: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      typeList: ["全部", "官方版", "原生", "现场版", "网易出品"],
      orderList: ["上升最快", "最热", "最新"],
      total: 100,
      page: 1,
      limit: 8,
      area: "全部",
      type: "全部",
      order: "上升最快",
      list: []
    };
  },
  // 侦听器
  watch: {
    area() {
      this.handleTagChange();
    },
    type() {
      this.handleTagChange();
    },
    order() {
      this.handleTagChange();
    }
  },
  created() {
    // 获取数据
    this.getData();
  },
  methods: {
    // 获取MV列表数据
    getData() {
      let params = {
        area: this.area,
        type: this.type,
        order: this.order,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      };
      this.$http.getMVAll(params).then((res) => {
        this.list = res.data.data;
        if (res.data.count) {
          this.total = res.data.count;
        }
      });
    },
    // 页码改变的回调函数
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    // 标签改变的回调函数
    handleTagChange() {
      this.page = 1;
      this.getData();
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

<style></style>
