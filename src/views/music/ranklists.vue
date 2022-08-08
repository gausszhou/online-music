<template>
  <div class="ranklist-container">
    <div class="rankList">
      <h3 class="title"></h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index" @click="toSongSheetDetail(item)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.description}}</span>
            </div>
            <div class="updateFrequency">{{item.updateFrequency}}</div>
            <img :src="item.coverImgUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">
            {{ item.name }}
            <span class="num">{{item.playCount | numbertocount}}</span>
          </p>
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
      list: [],
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      this.$http.getTopList().then(res => {
        this.list = res.data.list;
      });
    },
    toSongSheetDetail(item) {
      this.$router.push({
        name: 'detailSongSheet',
        query: {
          id: item.id
        }
      });
    },
  },
}
</script>

<style>
</style>