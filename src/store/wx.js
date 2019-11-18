
import {wxJsConfig} from "@/api/wx";
import {initWxJSSDK} from 'wx-choose-pay'

const SHARE_TITLE = '分享标题';
const SHARE_DESC = '描述';
const SHARE_LINK = '';
const SHARE_IMG = '';

const state = {
};

const mutations = {
}

const actions = {
  // 初始化微信JS-SDK
  initWxJSSDK({}) {
    return new Promise((resolve,reject) => {
console.log(1);
    wxJsConfig().then(res => {

      console.log(2);
      const jsApiList = [
        'updateAppMessageShareData',
        'onMenuShareAppMessage',
      ];

      let config = {
        ...res.data,
        debug: true,
        jsApiList
      };
      initWxJSSDK(config).then(
        () => {
          
      console.log(3);
          resolve('wx JS-SDK 注入成功!')
        },
        err => {
          reject(err);
        })
    })
    });
  },

  // 获取位置信息
  async getLocation({dispatch}){
    let res = await dispatch('initWxJSSDK').catch(err=>false);
    return res !== false ? await getLocation() : await getCurrentPosition();
  },

  // 设置分享
  updateShare({dispatch},data={}){
    
    console.log(0);
    return new Promise((resolve,reject) => {
      dispatch('initWxJSSDK').then(()=>{
        let {
          title = SHARE_TITLE, // 分享标题
          desc = SHARE_DESC,   // 分享描述
          link = SHARE_LINK,   // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl = SHARE_IMG,  // 分享图标
        } = data;
        console.log(4);

        wx.onMenuShareAppMessage({
          title,
          desc,
          link,
          imgUrl,
          success: function () {
            console.log('设置分享给朋友成功');
            resolve();
            // 设置成功
          },
          fail(err) {
            reject();
            console.log('设置分享给朋友成功', err);
          }
        })
      },reject)
    });
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// 通过微信 JS-SDK 获取位置
function getLocation() {
  return new Promise((resolve,reject) => {
    wx.getLocation({
      type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: resolve,
      error: reject
    });
  });
}

// 通过浏览器 geolocation api 获取位置
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator && navigator.geolocation ?
      navigator.geolocation.getCurrentPosition(position => resolve(position.coords), reject) :
      reject()
  });
}
