import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import 'jquery'
import './directives'
import '@/icons' // icon
import '@/permission' // permission control
import './utils/dialog'
import token from '@/utils/token'
import pageSetting from '@/utils/pageSetting'
import axios from 'axios'
import qs from 'qs'
import utils from '@/utils/custUtils'
import VueClipboard from 'vue-clipboard2'
import Print from '@/utils/print'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(Print)
Vue.prototype.$message1 = function(msg) {
  this.$message.success({ message: msg, duration: 1000 })
}
Vue.prototype.$token = token
Vue.prototype.$http = axios
Vue.prototype.$pageSetting = pageSetting
Vue.config.productionTip = false
Vue.prototype.$tableHeight = document.body.clientHeight - 335
Vue.prototype.userName = sessionStorage.getItem('employeeName')
Vue.prototype.userId = sessionStorage.getItem('employeeId')
Vue.prototype.qs = qs
Vue.prototype.$utils = utils
Vue.prototype.$upLoadbaseURL =
  'http://120.78.186.60:8105/api/uploadSalesContracts'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
