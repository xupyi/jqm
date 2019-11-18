
/**
 * 跳转微信授权
 */


// 微信授权地址
// const connect = 'https://open.weixin.qq.com/connect/oauth2/authorize';
// const connect = 'http://jinqiu.micropig.cn/get_code.html';
const connect = 'http://jinqiu.micropig.cn/wx/get_code.html';


// 微信回调参数
const wxData = {
  appid: 'wxdeb809cce8e156df',
  redirect_uri: getRedirectUri(),//encodeURIComponent与encodeURI不一样 getRedirectUri()

  response_type: 'code',
  // scope: 'snsapi_base',
  scope: 'snsapi_userinfo',
  state: '123',
};


export default doWxLogin;
export { doWxLogin }

/**
 * 跳转页面进行微信登录授权
 */
function doWxLogin(options={}) {
  //获取地址栏信息
  let href = location.href,
    hrefData = parseQueryString(href);

  //如果没有微信授权回调信息,则跳转进行授权
  // if (!hrefData.code)
  /*code可能会失效,直接跳转,不做判断地址栏是否已有code*/

  location.href = parseDataToUrl(connect, {...wxData,...options})
}

/**
 * 转换地址栏参数
 */
function parseQueryString(url) {
  var str = url.split("?")[1] || '',    //通过?得到一个数组,取?后面的参数
    items = str.split("&");    //分割成数组
  var arr, name, value;
  var obj = {};

  for (var i = 0; i < items.length; i++) {
    arr = items[i].split("=");    //["key0", "0"]
    name = arr[0];
    value = arr[1];
    obj[name] = value;
  }
  return obj;
}

/**
 * 转换参数为get类型
 */
function parseDataToUrl(url, obj) {
  if (typeof url !== "string" || typeof obj !== "object")
    return url;
  let reurl = url + "?";
  let keys = Object.keys(obj);
  keys.forEach(key => reurl += key + "=" + obj[key]/*encodeURIComponent(obj[key])*/ + "&");
  reurl = reurl.substring(0, reurl.length - 1);
  return reurl;
}


/**
 * 获取回调地址
 */
function getRedirectUri() {
  let {
    origin,
    pathname,
    search,
    hash,
    href
  } = location;

  search = '?' + search.slice(1).split('&').filter(query => !query.includes('code=') && !query.includes('state=')).join('&');
  return encodeURIComponent(origin + pathname + hash + search)
}
