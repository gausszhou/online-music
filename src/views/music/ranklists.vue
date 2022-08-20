<template>
  <div class="rank-list">
    <div class="items">
      <CallToAction
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :src="item.coverImgUrl"
        :count="item.playCount"
        @click.native="toDetailSongSheet(item)"
      />
    </div>
  </div>
</template>

<script>
import { rect1_1 } from "../../skeleton/image";
import CallToAction from "../../components/CallToAction.vue";
export default {
  name: "rankList",
  components: {
    CallToAction
  },
  data() {
    return {
      list: new Array(20).fill({
        name: "",
        coverImgUrl: rect1_1
      })
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      this.$http.getTopList().then((res) => {
        this.list = res.data.list;
      });
    },
    toDetailSongSheet(item) {
      this.$router.push({
        name: "detailSongSheet",
        query: {
          id: item.id
        }
      });
    }
  }
};
</script>

<style></style>
