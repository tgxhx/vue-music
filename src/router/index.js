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
          path:'index',
          component: Index,
          redirect: 'index/recommend',
          children: [
            {
              path: 'recommend',
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
    }
  ]
})
