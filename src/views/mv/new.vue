<template>
  <div class="mv-container">
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
              >{{ item || "全部" }}</span
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- MV容器 -->
    <div class="mvs">
      <div class="items">
        <CallToAction
          class="item aspect-16-9"
          v-for="(item, index) in list"
          :key="index"
          @click.native="toDetailMV(item)"
          :src="item.cover"
          :count="item.playCount"
          :title="item.artistName + item.name &&  `《${item.name.trim()}》`"
        ></CallToAction>
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
import { ImagePlaceholder } from "@/skeleton/image";
import CallToAction from "@/components/CallToAction"
export default {
  name: "latestMV",
  components:{
    CallToAction
  },
  data() {
    return {
      areaList: ["", "内地", "港台", "欧美", "日本", "韩国"],
      total: 100,
      page: 1,
      limit: 8,
      area: "",
      list: new Array(8).fill({
        name: "",
        cover: ImagePlaceholder,
        playCount: 99999,
        artistName: ""
      })
    };
  },
  // 侦听器
  watch: {
    area() {
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
        limit: this.limit
        // offset: (this.page - 1) * this.limit
      };
      this.$http.getMVFirst(params).then((res) => {
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

<style></style>
