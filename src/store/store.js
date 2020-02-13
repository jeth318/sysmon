import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
    stats: []
  },
  mutations: {
    SOCKET_stats() {
      // do something
      console.log('Mutation');
      
    }
  },
  actions: {
    SOCKET_stats() {
        console.log('Action');
        
      // do something
    }
  }
});
