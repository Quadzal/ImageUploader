import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import Home from "./components/Home.vue"
import ImageComponent from "./components/Image.vue"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios"
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { far } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Clipboard from 'v-clipboard'
 
Vue.use(Clipboard)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(BootstrapVue)

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:"/", component:Home, meta:{title:"Upload Image"}},
    {path:"/i/:image_code",
     component:ImageComponent,
     beforeEnter:(to, form, next) => {
        document.title = to.params.image_code
        next()
     }
    }
  ],
  mode:"history"
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
