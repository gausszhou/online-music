import Vue from "vue";
import VueRouter from "vue-router";
import Music from "@/views/music/index.vue";
import Recommend from "@/views/music/recommend.vue";
import Video from "@/views/video/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: { name: "recommend" }
  },
  {
    name: "music",
    path: "/music",
    component: Music,
    children: [
      {
        name: "recommend",
        path: "recommend",
        component: Recommend,
        meta: { title: "发现" }
      },
      {
        name: "newsongs",
        path: "newsongs",
        component: () => import("@/views/music/newsongs.vue"),
        meta: { title: "新歌" }
      },
      {
        name: "singer",
        path: "singer",
        component: () => import("@/views/music/singer.vue"),
        meta: { title: "歌手" }
      },
      {
        name: "songlists",
        path: "songlists",
        component: () => import("@/views/music/songlists.vue"),
        meta: { title: "歌单" }
      },
      {
        name: "ranklists",
        path: "ranklists",
        component: () => import("@/views/music/ranklists.vue"),
        meta: { title: "排行" }
      }
    ]
  },
  {
    name: "video",
    path: "/video",
    component: Video,
    children: [
      {
        name: "allMV",
        path: "allMV",
        component: () => import("@/views/video/allMV.vue"),
        meta: { title: "全部MV" }
      },
      {
        name: "newMV",
        path: "newMV",
        component: () => import("@/views/video/newMV.vue"),
        meta: { title: "最新MV" }
      }
    ]
  },
  {
    name: "search",
    path: "/search",
    component: () => import("@/views/search/index.vue"),
    meta: { title: "搜索结果|" }
  },
  {
    name: "detail",
    path: "/detail",
    component: () => import("@/views/detail/index.vue"),
    children: [
      {
        name: "detailMV",
        path: "detailMV",
        component: () => import("@/views/detail/detailMV.vue"),
        meta: { title: "MV详情" }
      },
      {
        name: "detailSongSheet",
        path: "detailSongSheet",
        component: () => import("@/views/detail/detailSongSheet.vue"),
        meta: { title: "歌单详情" }
      },
      {
        name: "detailSinger",
        path: "detailSinger",
        component: () => import("@/views/detail/detailSinger.vue"),
        meta: { title: "歌手详情" }
      }
    ]
  }
];

function getAbsolutePath() {
  let path = location.pathname;
  return path.substring(0, path.lastIndexOf("/") + 1);
}

const router = new VueRouter({  
  mode: "history", //  history  hash
  // vue-router里提供了一个base的属性，代表应用的基目录
  base: "/online-music/",
  routes
});


// 导出路由
export default router;
