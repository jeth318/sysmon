import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import store from "./store/store.js";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
