<template>
  <div class="rank-list">
    <h3 class="title">全球榜</h3>
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toSongSheetDetail(item)"
      >
        <div class="item-box img-wrap">
          <img :src="item.coverImgUrl" alt />
          <span class="iconfont icon-play"></span>
            <span class="num">{{ item.playCount | numbertocount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rankList',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getTopList()
  },
  methods: {
    getTopList() {
      this.$http.getTopList().then((res) => {
        this.list = res.data.list
      })
    },
    toSongSheetDetail(item) {
      this.$router.push({
        name: 'detailSongSheet',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style></style>
