import Vue from 'vue';
import VueRouter from 'vue-router';

import Music from '@/views/music/index.vue';
import MusicRecommend from '@/views/music/recommend.vue';
import MusicNewSongs from '@/views/music/newsongs.vue';
import MusicSongLists from '@/views/music/songlists.vue';
import MusicRankLists from '@/views/music/ranklists.vue';

import Singer from '@/views/singer/singer.vue';

import MV from '@/views/mv/index.vue';
import MVNew from '@/views/mv/new.vue';
import MVAll from '@/views/mv/all.vue';

import Search from  '@/views/search/index.vue'

import Detail from '@/views/detail/index.vue';
import DetailMV from '@/views/detail/detailMV.vue';
import DetailSongSheet from '@/views/detail/detailSongSheet.vue';
import DetailSinger from '@/views/detail/detailSinger.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: { name: 'recommend' }
  },
  {
    name: 'music',
    path: '/music',
    component: Music,
    children: [
      {
        name: 'recommend',
        path: 'recommend',
        component: MusicRecommend,
        meta: { title: '发现' }
      },
      {
        name: 'newsongs',
        path: 'newsongs',
        component: MusicNewSongs,
        meta: { title: '新歌' }
      },

      {
        name: 'songlists',
        path: 'songlists',
        component: MusicSongLists,
        meta: { title: '歌单' }
      },
      {
        name: 'ranklists',
        path: 'ranklists',
        component: MusicRankLists,
        meta: { title: '排行' }
      }
    ]
  },
  {
    name: 'singer',
    path: '/singer',
    component: Singer,
    meta: { title: '歌手' }
  },
  {
    name: 'mv',
    path: '/mv',
    component: MV,
    children: [
      {
        name: 'newMV',
        path: 'newMV',
        component: MVNew,
        meta: { title: '最新MV' }
      },
      {
        name: 'allMV',
        path: 'allMV',
        component: MVAll,
        meta: { title: '全部MV' }
      }
    ]
  },
  {
    name: 'search',
    path: '/search',
    component: Search,
    meta: { title: '搜索结果|' }
  },
  {
    name: 'detail',
    path: '/detail',
    component: Detail,
    children: [
      {
        name: 'detailMV',
        path: 'detailMV',
        component: DetailMV,
        meta: { title: 'MV 详情' }
      },
      {
        name: 'detailSongSheet',
        path: 'detailSongSheet',
        component: DetailSongSheet,
        meta: { title: '歌单详情' }
      },
      {
        name: 'detailSinger',
        path: 'detailSinger',
        component: DetailSinger,
        meta: { title: '歌手详情' }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash', //  history  hash
  base: '/online-music/',
  routes
});

// 导出路由
export default router;
