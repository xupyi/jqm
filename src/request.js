// 拦截器
import axios from 'axios'
import store from './store'
import router from './router/index'
import { Dialog } from 'vant';

// import store from '@/store'
// enement消息提示
// 全局post发送头部为conten——type类型，定义类型为json类型，字符格式utf-8
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


// axios.defaults.headers.post['Content-Type'] = 'Access-Control-Allow-Origin: *"'
// 1 创建一个axios实例，进行请求配置
const servive = axios.create({
  baseURL: 'http://jinqiu.micropig.cn/',
  timeout: 5000,
  // headers: {
  // 'X-Requested-With': 'XMLHttpRequest',
  // 'Content-Type': 'application/json; charset=UTF-8',
  // 'Access-Control-Allow-Origin': '*'
  // },
})

servive.interceptors.request.use(
  config => {
   
    if (localStorage.getItem("token")) {
      config.headers['token'] = localStorage.getItem("token")//访问全局变量下的token值
      store.state.is_login = true
    } else {
      store.state.is_login = false
    }
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// http response 拦截器 token失效的判断
servive.interceptors.response.use(
  response => {

    if (response.data.status == 10001||response.data.status == 10002) {
      store.commit("hide_looding");
      store.state.shadow_ss=true
    } else {
      // this.$router.push('/login')
      // window.localStorage.if_login_tiem = false
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default servive