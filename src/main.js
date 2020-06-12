import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading, {
  props: {
    spinner: 'default',
    /* other props need to configure */
  },
  system: {
    throttleLimit: 50,
    /* other settings need to configure */
  },
  slots: {
    noMore: 'No more data', // you can pass a string value
  },
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
