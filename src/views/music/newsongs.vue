<template>
  <div class="songs-container">
    <!-- 上面的标签 -->
    <div class="tab-bar">
      <span
        class="item"
        v-for="(item,index) in tagList"
        :key="index"
        @click="tag = item.tag"
        :class="{ active: tag == item.tag }"
      >{{item.label}} |</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th>序号</th>
        <th>封面</th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="index" class="el-table__row">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt />
              <span @click="getMusic(item)" class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td>{{ item.album.artists['0'].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | mstotime }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 分页器-->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>

export default {
  name: 'latestMusic',
  data() {
    return {
      // 分类标签列表
      tagList: [
        { tag: 0, label: '全部' },
        { tag: 7, label: '华语' },
        { tag: 96, label: '欧美' },
        { tag: 8, label: '日本' },
        { tag: 16, label: '韩国' },
      ],
      // 当前分类标签
      tag: '0',
      // 歌曲列表
      list: [],
      lists: [],
      total: 100,
      page: 1
    };
  },
  watch: {
    tag() {
      this.getTopSong();
    },
    page(newV) {
      this.list = this.lists.slice((newV - 1) * 10, newV * 10);
    }
  },
  created() {
    this.getTopSong();
  },
  methods: {
    // 获取列表数据
    getTopSong() {
      // 获取 最新音乐数据
      let params = {
        type: this.tag,
      };
      this.$http.getTopSong(params).then(res => {
        this.lists = res.data.data;
        this.list = this.lists.slice((this.page - 1) * 10, this.page * 10);
      });

    },
    // 播放歌曲
    getMusic(item) {
      this.$store.dispatch('getMusic', item);
    },
    handleCurrentChange(page) {
      this.page = page;
    }
  }
}
</script>

<style></style>
