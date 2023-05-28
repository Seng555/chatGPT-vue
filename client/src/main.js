import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
// MinUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import AxiosPlugin from './plugins/axios';
import router from './router'

Vue.use(AxiosPlugin);


Vue.use(MintUI)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
    // Your code goes here
    if(to.meta && to.meta.title){
      document.title = to.meta.title;
  } else{
     const appName= 'Updoun bot';
     document.title = `${appName} - ${to.name ? to.name : ''}`;
  }
  next();
  })

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
