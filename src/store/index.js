import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  url: 'http://39.108.14.248:3000',
}

export default new Vuex.Store({
  state
})
