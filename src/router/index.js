import Vue from 'vue'
import Router from 'vue-router'
import Root from '@/components/Root'

import Index from '../page/index/Index'
import Recommend from '../page/index/Recommend'
import SongList from '../page/index/SongList'
import Radio from '../page/index/Radio'
import Top from '../page/index/Top'

import Home from '../page/home/Home'
import PlayListDetail from '../page/PlayListDetail'
import Search from '../page/search/Search'
import Song from '../page/search/Song'
import Artist from '../page/search/Artist'
import Album from '../page/search/Album'
import List from '../page/search/list.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/root/index'
    },
    {
      path: '/root',
      name: 'Root',
      component: Root,
      children: [
        {
          path: 'index',
          name: 'Test',
          component: Index,
          redirect: 'index/recommend',
          children: [
            {
              path: 'recommend',
              name: 'recommend',
              component: Recommend
            },
            {
              path: 'songlist',
              component: SongList
            },
            {
              path: 'radio',
              component: Radio
            },
            {
              path: 'top',
              component: Top
            }
          ]
        },
        {
          path: 'home',
          component: Home
        },
      ]
    },
    {
      path: '/playlistdetail/:id',
      component: PlayListDetail
    },
    {
      path: '/search',
      component: Search,
      redirect: '',
      children: [
        {
          path: 'song',
          component: Song
        },
        {
          path: 'artist',
          component: Artist
        },
        {
          path: 'album',
          component: Album
        },
        {
          path: 'list',
          component: List
        }
      ]
    }
  ]
})
