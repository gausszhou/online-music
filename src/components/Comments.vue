<template>
  <div class="comment-wrap">
    <p class="comment-title">
      {{title}}
      <span class="comment-number">({{ commentsTotal }})</span>
    </p>
    <div class="comments-wrap">
      <div class="item" v-for="(item, index) in comments" :key="index">
        <div class="icon-wrap">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="content-wrap">
          <div class="content">
            <span class="name">{{ item.user.nickname }}</span>
            <span class="comment">: {{ item.content }}</span>
          </div>
          <div class="re-content" v-if="item.beReplied.length">
            <span class="name">@{{ item.beReplied[0].user.nickname }}</span>
            <span class="comment">: {{ item.beReplied[0].content }}</span>
          </div>
          <div class="date">{{ item.time | timestamp }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title:{
      type:String,
      default:"最新评论"
    },
    commentsTotal: {
      type: Number,
      default: 0
    },
    comments: {
      type: Array,
      default: () => [
        {
          user: {
            avatarUrl: "",
            nickname: "",
            content: ""
          },
          beReplied: [
            {
              user: {
                nickname: "",
                content: ""
              }
            }
          ],
          time: Date.now()
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
