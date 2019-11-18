import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import About from '../views/home/About.vue'
import login from '../components/login.vue'
import regist from '../components/regist.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: 'mobile',
  routes: [
    {
      path: '/',
      redirect: '/home',
      
      component: () => import('../components/one.vue'),
    }, {
      path: '/home',
      component: Home,
      redirect: '/home/about',
      children: [{
        path: 'about',
        component: About
      }, {
        path: 'answers',
        component: () => import('../views/home/Answers.vue')
      }, {
        path: 'panorama',
        component: () => import('../views/home/Panorama.vue')
      }, {
        path: 'room',
        component: () => import('../views/home/Room-reservations.vue')
      }, {
        path: 'design',
        redirect:'/home/design/designer_cont',
       
        component:()=>import('../views/home/design-view/design.vue'),
        children:[{
          path:'designer_cont',
          
          component:()=>import('../views/home/design-view/designer_content.vue'),
        },{
          path:'designer_list',
          component:()=>import('../views/home/design-view/designer_list.vue'),
        }]
      }, {
        path: 'roadwork',
        component: () => import('../views/home/road-work-view/Road-work.vue'),
        redirect:'/home/roadwork/road_work_content',
        children:[{
          path:'road_work_list',
          component:()=>import('../views/home/road-work-view/road_work_list.vue'),
        },{
          path:'road_work_content',
          component:()=>import('../views/home/road-work-view/road_work_content.vue'),
        }]
      }, {
        path: 'setmeal',
        component: () => import('../views/home/Set-meal.vue')
      }, {
        // 装饰商城
        path: 'shopping',
        component: () => import('../views/home/shopping-view/Shopping-mall.vue'),
        redirect: '/home/shopping/promotion',
        children: [{
          path: 'promotion',
          component: () => import('../views/home/shopping-view/promotion.vue')
        }, {
          path: 'shopping_list',
          component: () => import('../views/home/shopping-view/shopping_list.vue')
        }]
      }]
    }, {
      // 设计地墙顶
      path: '/select_design',
      component: () => import('../views/home/design-view/select_design.vue')
    }, {
      // 套餐地墙顶
      path: '/select_set_meal',
      component: () => import('../views/home/select_set_meal.vue')
    }, {
      // 设计师详情
      path: '/designer_detail',
      component: () => import('../views/home/designer_detail.vue')
    }, {
      // 购物车
      path: '/shop',
      component: () => import('../components/Shop.vue')
    }, {
      // 我的订单
      path: '/order',
      component: () => import('../components/order.vue'),
      redirect: '/order/shop_order',
      children: [{
        path: 'shop_order',
        component: () => import('../views/order-view/shop_order.vue')
      }, {
        //
        path: 'other_order',
        component: () => import('../views/order-view/other_order.vue')
      }]
    }, {
      // 商品详情
      path: '/shop_detail',
      component: () => import('../views/home/shopping-view/shop_detail.vue'),
    }, {
      // 联系我们
      path: '/contact',
      component: () => import('../components/Contact.vue')
    }, {
      // 投诉建议
      path: '/complaints',
      component: () => import('../components/Complaints.vue')
    }, {
      // 消息
      path: '/message',
      component: () => import('../components/Message.vue')
    }, {
      // 结算付款多个商品
      path: '/settle',
      component: () => import('../components/settle.vue')
    }, {
      // 结算付款单个
      path: '/one_settle',
      component: () => import('../components/one_settle.vue')
    }, {
      // 退款
      path: '/refund',
      component: () => import('../components/Refund.vue')
    }, {
      // 订单详情
      path: '/order_detail',
      component: () => import('../views/order-view/order_detail.vue')
    }, {
      // 商品订单详情
      path: '/shop_order_detail',
      component: () => import('../views/order-view/shop_order_detail.vue')
    }, {
      // 物流信息
      path: '/wuliu',
      component: () => import('../views/order-view/wuliu.vue')
    }, {
      // 商品评价
      path: '/shop_assess',
      component: () => import('../views/order-view/shop_assess.vue')
    }, {
      // 订单评价
      path: '/order_assess',
      component: () => import('../views/order-view/order_assess.vue')
    }, {
      // 套餐订单评价
      path: '/tc_assess',
      component: () => import('../views/order-view/tc_assess.vue')
    }, {
      // 查看发票
      path: '/look_invoice',
      component: () => import('../views/order-view/look_invoice.vue')
    }, {
      //登录
      path: '/login',
      component: login
    }, {
      // 注册
      path: '/regist',
      component: regist
    }, {
      // 忘记密码
      path: '/forget_pwd',
      component: () => import('../components/forget_pwd.vue')
    }, {
      // 个人中心
      path: '/personal',
      component: () => import('../components/personal.vue'),
      redirect: '/personal',
      children: [{
        path: '/',
        component: () => import('../views/user-view/user.vue')
      }, {
        // 用户个人资料
        path: 'user_info',
        component: () => import('../views/user-view/user_info.vue')
      }, {
        // 用户个人资料
        path: 'gkzl',
        component: () => import('../views/user-view/gkzl.vue')
      }, {
        // 收货地址
        path: 'address',
        component: () => import('../views/user-view/address.vue')
      }, {
        // 修改收货地址
        path: 'revise_address',
        component: () => import('../views/user-view/revise_address.vue')
      }, {
        // 添加收货地址
        path: 'add_address',
        component: () => import('../views/user-view/add_address.vue')
      }, {
        // 修改密码
        path: 'change_password',
        component: () => import('../views/user-view/Change_Password.vue')
      }, {
        // 发票
        path: 'invoice',
        component: () => import('../views/user-view/invoice.vue')
      }, {
        path: 'add_invoice',
        component: () => import('../views/user-view/invoice_add.vue')
      }, {
        // 我的二维码
        path: 'my_code',
        component: () => import('../views/user-view/my_code.vue')
      }, {
        // 房屋信息
        path: 'house_info',
        component: () => import('../views/user-view/house_info.vue')
      }, {
        path: 'house_detail',
        component: () => import('../views/user-view/house_detail.vue')
      }, {
        // 收藏
        path: 'collection',
        component: () => import('../views/user-view/Collection.vue')
      }, {
        // 我的投诉建议
        path: 'my_complaints',
        component: () => import('../views/user-view/my_complaints.vue')
      }, {
        // 设计师个人中心
        path: 'desgin_user_info',
        component: () => import('../views/user-view/desgin/desgin_user_info.vue'),
      }, {
        // 设计师订单
        path: 'desgin_await_order',
        component: () => import('../views/user-view/desgin/desgin_await_order.vue')
      }, {
        // 施工长个人中心
        path: 'constructor_user_info',
        component: () => import('../views/user-view/constructor/constructor_user_info.vue')
      }, {
        // 施工长上传隐蔽施工图
        path: 'yinbi',
        component: () => import('../views/user-view/constructor/yinbi.vue')
      }, {
        // 施工长订单
        path: 'constructor_await_order',
        component: () => import('../views/user-view/constructor/constructor_await_order.vue')
      },  {
        // 施工订单评价
        path: 'cinstructor_aassess',
        component: () => import('../views/user-view/constructor/cinstructor_aassess.vue')
      }, {
        // 用工那个管理
        path: 'run_work',
        component: () => import('../views/user-view/constructor/run_work.vue')
      }, {
        // 选择小工管理
        path: 'run_xiaogong',
        component: () => import('../views/user-view/constructor/run_xiaogong.vue')
      }, {
        // 小工详细资料
        path: 'se_xiaogong_detail',
        component: () => import('../views/user-view/constructor/se_xiaogong_detail.vue')
      }, {
        // 业务员 个人中心
        path: 'salesman_user_info',
        component: () => import('../views/user-view/salesman/salesman_user_info.vue'),
      }, {
        // 业务员 订单
        path: 'salesman_await_order',
        component: () => import('../views/user-view/salesman/salesman_await_order.vue')
      }, {
        // 一个订单详情
        path: 'one_order_detail',
        component: () => import('../views/user-view/salesman/one_order_detail.vue')
      }, {
        // 城市合伙人 个人中心
        path: 'partner_user_info',
        component: () => import('../views/user-view/partner/partner_user_info.vue'),
      },{
        // 业务员资料
        path: 'salesman_info',
        component: () => import('../views/user-view/partner/salesman_info.vue'),
      }, {
        // 城市合伙人 订单
        path: 'partner_await_order',
        component: () => import('../views/user-view/partner/partner_await_order.vue')
      }, {
        // 小工个人中心
        path: 'xiaogong_user_info',
        component: () => import('../views/user-view/xiaogong/xiaogongs_user_info.vue'),
      }, {
        // 小工订单
        path: 'xiaogong_await_order',
        component: () => import('../views/user-view/xiaogong/xiaogong_await_order.vue')
      }, {
        // 修改小工个人资料
        path: 'xiaogong_detail',
        component: () => import('../views/user-view/xiaogong/xiaogong_detail.vue')
      }, {
        // 高级用户修改个人资料
        path: 'supper_detail',
        component: () => import('../views/user-view/supper_detail.vue'),
      },
      ]
    }, {
      // 高级用户修改个人资料
      path: '*',
      redirect: '/home/about'
    },
  ]
})
