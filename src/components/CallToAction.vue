<template>
  <div class="call-to-action">
    <div class="img-wrap">
      <div class="num-wrap" v-if="count">
        <i class="num-icon ri-headphone-line"></i>
        <span class="num-text">{{ count | numbertocount }}</span>
      </div>
      <img ref="img" class="img-image" :src="src" alt />
      <span class="img-icon iconfont icon-play"></span>
    </div>
    <div class="title-wrap" v-if="title">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { ImagePlaceholder } from "../skeleton/image";

export default {
  name: "CallToAction",
  props: {
    count: {
      type: Number,
      default: 0
    },
    src: {
      type: String,
      default: ImagePlaceholder
    },

    title: {
      type: String,
      default: ""
    },
    aspect: {
      type: Number,
      default: 1.66
    }
  },
  mounted() {
    this.$refs.img.style.setProperty("--aspect", this.aspect + "");
  }
};
</script>

<style lang="scss">
.call-to-action {
  cursor: pointer;
  .img-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 4px;
    overflow: hidden;
  }
}

.aspect-16-9 .img-wrap {
  aspect-ratio: 16/9;
}

.img-wrap .num-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  padding: 0 0.5rem;
  font-size: 14px;
  color: white;
  line-height: 30px;
  padding-left: 5px;
  overflow: hidden;
  text-align: right;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .num-icon {
    margin-right: 0.5rem;
  }
}

.img-wrap .img-image {
  width: 100%;
  height: 100%;
}

.img-wrap .img-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  color: #dd6d60;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.img-wrap:hover .img-icon {
  opacity: 1;
}
.title-wrap {
  width: 100%;
  overflow: hidden;
  margin-top: 0.5em;
  font-size: 14px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  .title-text {
    max-width: 100%;
  }
}
</style>
