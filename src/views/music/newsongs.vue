<template>
  <div class="songs-container">
    <!-- 上面的标签 -->
    <div class="tab-bar">
      <span
        class="item"
        v-for="(item, index) in tagList"
        :key="index"
        @click="tag = item.tag"
        :class="{ active: tag == item.tag }"
        >{{ item.label }}</span
      >
    </div>
    <!-- 底部的table -->
    <el-table :lazy="true" :data="list" border stripe @row-click="getMusic">
      <el-table-column type="index" label="序号" width="50px"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <span>{{ scope.row.album.artists['0'].name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template slot-scope="scope">
          <span>{{ scope.row.album.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          <span>{{ scope.row.duration | mstotime }}</span>
        </template>
      </el-table-column>
    </el-table>
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
        { tag: 16, label: '韩国' }
      ],
      // 当前分类标签
      tag: '0',
      // 歌曲列表
      list: [],
      lists: [],
      total: 100,
      page: 1,
      limit: 20
    }
  },
  watch: {
    tag() {
      this.getTopSong()
    },
    page(newV) {
      const limit = this.limit
      console.log(this.limit)
      this.list = this.lists.slice((newV - 1) * limit, newV * limit)
    }
  },
  created() {
    this.getTopSong()
  },
  methods: {
    // 获取列表数据
    getTopSong() {
      // 获取 最新音乐数据
      let params = {
        type: this.tag
      }
      this.$http.getTopSong(params).then((res) => {
        this.lists = res.data.data
        const limit = this.limit
        this.list = this.lists.slice((this.page - 1) * limit, this.page * limit)
      })
    },
    // 播放歌曲
    getMusic(item) {
      this.$store.dispatch('getMusic', item)
    },
    handleCurrentChange(page) {
      this.page = page
    }
  }
}
</script>
