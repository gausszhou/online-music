import Vue from "vue";
import VueRouter from "vue-router";
import Music from "@/views/music/index.vue";
import Recommend from "@/views/music/recommend.vue";
import MV from "@/views/mv/index.vue";
import NewMV from "@/views/mv/newMV.vue";

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
    name: "singer",
    path: "/singer",
    component: () => import("@/views/singer/singer.vue"),
    meta: { title: "歌手" }
  },
  {
    name: "mv",
    path: "/mv",
    component: MV,
    children: [
      {
        name: "newMV",
        path: "newMV",
        component: NewMV,
        meta: { title: "最新MV" }
      },
      {
        name: "allMV",
        path: "allMV",
        component: () => import("@/views/mv/allMV.vue"),
        meta: { title: "全部MV" }
      },
    
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

const router = new VueRouter({  
  mode: "history", //  history  hash
  base: "/online-music/",
  routes
});


// 导出路由
export default router;
