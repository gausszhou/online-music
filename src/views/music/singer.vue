<template>
  <div class="singer-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 语种 -->

        <ul class="tabs-wrap">
          <span class="section-type">语种:</span>
          <li class="tab" v-for="(item,index) in areaList" :key="index">
            <span class="title" :class="{ active: area == item.value }" @click="area = item.value">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <!-- 分类切换 类型 -->
      <div class="type-wrap">
        <ul class="tabs-wrap">
          <span class="type-type">分类:</span>
          <li class="tab" v-for="(item,index) in typeList" :key="index">
            <span class="title" :class="{ active: type == item.value }" @click="type = item.value">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div class="init-wrap">
        <ul class="tabs-wrap">
          <span class="init-type">筛选:</span>
          <li class="tab" v-for="(item,index) in initialList" :key="index">
            <span class="title" :class="{ active: initial == item.value }" @click="initial = item.value">{{item.label}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="mvs singers">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <img :src="item.img1v1Url" alt />
            <div class="num-wrap"></div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
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
  name: 'singer',
  data() {
    return {
      areaList: [
        { value: -1, label: '全部' },
        { value: 7, label: '华语' },
        { value: 96, label: '欧美' },
        { value: 8, label: '日本' },
        { value: 16, label: '韩国' },
        { value: 0, label: '其他' }],
      typeList: [
        { value: -1, label: '全部' },
        { value: 1, label: '男歌手' },
        { value: 2, label: '女歌手' },
        { value: 3, label: '乐队' }
      ],
      initialList: [
        { value: -1, label: '全部' },
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
        { value: 'd', label: 'D' },
        { value: 'e', label: 'E' },
        { value: 'f', label: 'F' },
        { value: 'g', label: 'G' },
        { value: 'h', label: 'H' },
        { value: 'i', label: 'I' },
        { value: 'j', label: 'J' },
        { value: 'k', label: 'K' },
        { value: 'l', label: 'L' },
        { value: 'm', label: 'M' },
        { value: 'n', label: 'N' },
        { value: 'o', label: 'O' },
        { value: 'p', label: 'P' },
        { value: 'q', label: 'Q' },
        { value: 'r', label: 'R' },
        { value: 's', label: 'S' },
        { value: 't', label: 'T' },
        { value: 'u', label: 'U' },
        { value: 'v', label: 'V' },
        { value: 'w', label: 'W' },
        { value: 'x', label: 'X' },
        { value: 'y', label: 'Y' },
        { value: 'z', label: 'Z' },
        { value: 0, label: '#' }
      ],
      total: 100,
      page: 1,
      limit: 24,
      area: -1,
      type: -1,
      initial: -1,
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
    initial() {
      this.handleTagChange();
    }
  },
  created() {
    // 获取数据
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        area: this.area,
        type: this.type,
        initial: this.initial,
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      };
      this.$http.getArtistList(params).then(res => {
        this.list = res.data.artists;
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
    }
  }
}
</script>

<style></style>
