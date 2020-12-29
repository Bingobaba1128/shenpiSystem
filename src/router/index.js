import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import spLayout from '@/layout/spLayout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: () => import('@/views/login/localLogin'),
    hidden: true
  },
  {
    path: '/Layout',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '工作台', icon: 'dashboard' }
    }]
  },
  {
    path: '/审批管理',
    component: Layout,
    meta: { title: '审批管理', icon: 'nested' },
    children: [
      {
        path: '审批管理',
        name: '审批管理',
        component: () => import('@/views/shenPi/index'),
        meta: { title: '审批管理' }
      },
      {
        path: '审批管理/我审批的',
        name: '审批管理',
        component: () => import('@/views/shenPi/index2'),
        meta: { title: '审批管理' },
        hidden: true
      },
      {
        path: '审批管理/我发起的',
        name: '审批管理',
        component: () => import('@/views/shenPi/index3'),
        meta: { title: '审批管理' },
        hidden: true
      },
      {
        path: '审批管理/抄送我的',
        name: '审批管理',
        component: () => import('@/views/shenPi/index4'),
        meta: { title: '审批管理' },
        hidden: true
      },
      {
        path: '审批详情',
        name: '审批详情',
        component: () => import('@/views/shenPi/subpage'),
        meta: { title: '审批详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/审批配置',
    component: Layout,
    meta: { title: '审批配置', icon: 'nested' },
    children: [
      {
        path: '系统分类',
        name: '系统分类',
        component: () => import('@/views/shenPiPeiZhi/xiTongFenLei'),
        meta: { title: '系统分类' }
      },
      {
        path: '单据分类',
        name: '单据分类',
        component: () => import('@/views/shenPiPeiZhi/danJuFenLei'),
        meta: { title: '单据分类' }
      },
      {
        path: '审批流程配置',
        name: '审批流程配置',
        component: () => import('@/views/shenPiPeiZhi/liuChengPeiZhi'),
        meta: { title: '审批流程配置' }
      }
    ]
  },
  // {
  //   path: '/基础配置',
  //   component: Layout,
  //   meta: { title: '基础配置', icon: 'nested' },
  //   children: [
  //     {
  //       path: '单位管理',
  //       name: '单位管理',
  //       component: () => import('@/views/jichupeizhi/danweiguanli'),
  //       meta: { title: '单位管理' }
  //     },
  //     {
  //       path: '物料分类',
  //       name: '物料分类',
  //       component: () => import('@/views/jichupeizhi/wuliaofenlei/wuliaofenlei'),
  //       meta: { title: '物料分类' }
  //     },
  //     {
  //       path: '物料类型',
  //       name: '物料类型',
  //       component: () => import('@/views/jichupeizhi/wuliaoleixing/wuliaoleixing'),
  //       meta: { title: '物料类型' }
  //     },

  //     {
  //       path: '物料管理',
  //       name: '物料管理',
  //       component: () => import('@/views/jichupeizhi/wuliaoguanli/wuliaoguanli'),
  //       meta: { title: '物料管理' }
  //     },
  //     // {
  //     //   path: '物料管理历史记录',
  //     //   name: '物料管理历史记录',
  //     //   component: () => import('@/views/jichupeizhi/wuliaoguanlilishijilu'),
  //     //   meta: { title: '物料管理历史记录', icon: 'nested' }
  //     // },
  //     {
  //       path: '费用分类',
  //       name: '费用分类',
  //       component: () => import('@/views/jichupeizhi/feiyongfenlei'),
  //       meta: { title: '费用分类' }
  //     },
  //     {
  //       path: '费用类型',
  //       name: '费用类型',
  //       component: () => import('@/views/jichupeizhi/feiyongleixing'),
  //       meta: { title: '费用类型' }
  //     },
  //     {
  //       path: '费用管理',
  //       name: '费用管理',
  //       component: () => import('@/views/jichupeizhi/feiyongguanli'),
  //       meta: { title: '费用管理' }
  //     }

  //   ]
  // },
  // {
  //   path: '/档案管理',
  //   component: Layout,
  //   name: 'Danganguanli',
  //   meta: { title: '档案管理', icon: 'nested' },
  //   children: [
  //     {
  //       path: '/客户档案',
  //       name: 'Kehudangan',
  //       component: () => import('@/views/danganguanli/kehudangan'),
  //       meta: { title: '客户档案' }
  //     },
  //     {
  //       path: '/客户档案/客户档案新增',
  //       name: 'Kehudanganxinzeng',
  //       component: () => import('@/views/danganguanli/kehudangan/addNewForm'),
  //       meta: { title: '客户档案(新增)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/客户档案/客户档案修改',
  //       name: 'Kehudanganxiugai',
  //       component: () => import('@/views/danganguanli/kehudangan/editNewForm'),
  //       meta: { title: '客户档案(修改)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/客户档案/客户档案详情',
  //       name: 'Kehudanganchakan',
  //       component: () => import('@/views/danganguanli/kehudangan/showForm'),
  //       meta: { title: '客户档案(详情)' },
  //       hidden: true
  //     },
  //     {
  //       path: '/加工厂档案',
  //       name: 'Jiagongchangdangan',
  //       component: () => import('@/views/danganguanli/jiagongchangdangan'),
  //       meta: { title: '加工厂档案' }
  //     },
  //     {
  //       path: '/加工厂档案/加工厂档案新增',
  //       name: 'Jiagongchangdanganxinzeng',
  //       component: () => import('@/views/danganguanli/jiagongchangdangan/addNewForm'),
  //       meta: { title: '加工厂档案(新增)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/加工厂档案/加工厂档案修改',
  //       name: 'Jiagongchangdanganxiugai',
  //       component: () => import('@/views/danganguanli/jiagongchangdangan/editNewForm'),
  //       meta: { title: '加工厂档案(修改)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/加工厂档案/加工厂档案详情',
  //       name: 'Jiagongchangdanganchakan',
  //       component: () => import('@/views/danganguanli/jiagongchangdangan/showForm'),
  //       meta: { title: '加工厂档案(详情)' },
  //       hidden: true

  //     }
  //   ]
  // },

  // {
  //   path: '/销售管理',
  //   component: Layout,
  //   name: '销售管理',
  //   meta: { title: '销售管理', icon: 'nested' },
  //   children: [
  //     {
  //       path: '/销售合同',
  //       name: 'Xiaoshouhetong',
  //       component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/index'),
  //       meta: { title: '销售合同' }
  //     },
  //     {
  //       path: '/销售合同/销售合同新增',
  //       name: 'Xiaoshouhetongxinzeng',
  //       component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/addNewForm'),
  //       meta: { title: '销售合同(新增)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/销售合同/销售合同修改',
  //       name: 'Xiaoshouhetongxiugai',
  //       component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/editNewForm'),
  //       meta: { title: '销售合同(修改)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/销售合同/销售合同详情',
  //       name: 'Xiaoshouhetongchakan',
  //       component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showForm'),
  //       meta: { title: '销售合同(详情)' },
  //       hidden: true
  //     },

  //     {
  //       path: '/采购合同',
  //       name: 'Caigouhetong',
  //       component: () => import('@/views/xiaoshouguanli/caigouhetong/index'),
  //       meta: { title: '采购合同' }
  //     },
  //     {
  //       path: '/采购合同/采购合同新增',
  //       name: 'Caigouhetongxinzeng',
  //       component: () => import('@/views/xiaoshouguanli/caigouhetong/addNewForm'),
  //       meta: { title: '采购合同(新增)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/采购合同/采购合同修改',
  //       name: 'Caigouhetongxiugai',
  //       component: () => import('@/views/xiaoshouguanli/caigouhetong/editNewForm'),
  //       meta: { title: '采购合同(修改)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/采购合同/采购合同详情',
  //       name: 'Caigouhetongchakan',
  //       component: () => import('@/views/xiaoshouguanli/caigouhetong/showForm'),
  //       meta: { title: '采购合同(详情)' },
  //       hidden: true
  //     },
  //     {
  //       path: '/发货申请',
  //       name: 'Fahuoshenqing',
  //       component: () => import('@/views/xiaoshouguanli/fahuoshenqing/index'),
  //       meta: { title: '发货申请' }
  //     },
  //     {
  //       path: '/发货申请/发货申请新增',
  //       name: 'Fahuoshenqingxinzeng',
  //       component: () => import('@/views/xiaoshouguanli/fahuoshenqing/addNewForm'),
  //       meta: { title: '发货申请(新增)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/发货申请/发货申请修改',
  //       name: 'Fahuoshenqingxiugai',
  //       component: () => import('@/views/xiaoshouguanli/fahuoshenqing/editNewForm'),
  //       meta: { title: '发货申请(修改)', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/发货申请/发货申请详情',
  //       name: 'Fahuoshenqingchakan',
  //       component: () => import('@/views/xiaoshouguanli/fahuoshenqing/showForm'),
  //       meta: { title: '发货申请(详情)' },
  //       hidden: true
  //     },
  //     {
  //       path: '/大货跟单进度表',
  //       name: 'Dahuogendanjindubiao',
  //       component: () => import('@/views/xiaoshouguanli/dahuogendanjindubiao/index'),
  //       meta: { title: '大货跟单进度表' }
  //     }
  //   ]
  // },

  // {
  //   path: '/销售合同审批详情',
  //   name: 'Xiaoshouhetongchakan',
  //   component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showSpForm'),
  //   meta: { title: '销售合同(审批详情)' },
  //   hidden: true
  // },

  // {
  //   path: '/仓库管理',
  //   component: Layout,
  //   name: 'Cangkuguanli',
  //   meta: { title: '仓库管理', icon: 'nested' },
  //   children: [
  //     {
  //       path: '/采购入库',
  //       name: 'Caigouruku',
  //       component: () => import('@/views/cangkuguanli/caigouruku'),
  //       meta: { title: '采购入库' }
  //     },
  //     {
  //       path: '/采购入库/采购入库新增',
  //       name: 'Caigourukuxinzeng',
  //       component: () => import('@/views/cangkuguanli/caigouruku/addNewForm'),
  //       meta: { title: '采购入库(新增)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/采购入库/采购入库修改',
  //       name: 'Caigourukuxiugai',
  //       component: () => import('@/views/cangkuguanli/caigouruku/editNewForm'),
  //       meta: { title: '采购入库(修改)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/采购入库/采购入库详情',
  //       name: 'Caigourukuchakan',
  //       component: () => import('@/views/cangkuguanli/caigouruku/showForm'),
  //       meta: { title: '采购入库(详情)', icon: 'dashboard' },
  //       hidden: true
  //     },
  //     {
  //       path: '/销售出库',
  //       name: 'Xiaoshouchuku',
  //       component: () => import('@/views/cangkuguanli/xiaoshouchuku'),
  //       meta: { title: '销售出库' }
  //     },

  //     {
  //       path: '/销售出库/销售出库新增',
  //       name: 'Xiaoshouchukuxinzeng',
  //       component: () => import('@/views/cangkuguanli/xiaoshouchuku/addNewForm'),
  //       meta: { title: '销售出库(新增)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/销售出库/销售出库修改',
  //       name: 'Xiaoshouchukuxiugai',
  //       component: () => import('@/views/cangkuguanli/xiaoshouchuku/editNewForm'),
  //       meta: { title: '销售出库(修改)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/销售出库/销售出库详情',
  //       name: 'Xiaoshouchukuchakan',
  //       component: () => import('@/views/cangkuguanli/xiaoshouchuku/showForm'),
  //       meta: { title: '销售出库(详情)', icon: 'dashboard' },
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '/报价单',
  //   component: Layout,
  //   name: 'Baojiadan',
  //   meta: { title: '报价单', icon: 'nested' },
  //   children: [
  //     {
  //       path: '/报价单',
  //       name: 'Baojiadan',
  //       component: () => import('@/views/baoJiaDan'),
  //       meta: { title: '报价单' }
  //     },
  //     {
  //       path: '/报价单/报价单新增',
  //       name: 'Baojiadanxinzeng',
  //       component: () => import('@/views/baoJiaDan/addNewForm'),
  //       meta: { title: '报价单(新增)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/报价单/报价单修改',
  //       name: 'Baojiadanxiugai',
  //       component: () => import('@/views/baoJiaDan/editNewForm'),
  //       meta: { title: '报价单(修改)', icon: 'dashboard', keepAlive: true },
  //       hidden: true
  //     },
  //     {
  //       path: '/报价单/报价单详情',
  //       name: 'Baojiadanchakan',
  //       component: () => import('@/views/baoJiaDan/showForm'),
  //       meta: { title: '报价单(详情)', icon: 'dashboard' },
  //       hidden: true
  //     },
  //     {
  //       path: '/报价单/报价单预览',
  //       name: 'Baojiadanyulan',
  //       component: () => import('@/views/baoJiaDan/yuLanForm'),
  //       meta: { title: '报价单预览', icon: 'dashboard' },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: '/审批模块',
  //   component: spLayout,
  //   name: 'ShenPi',
  //   meta: { title: '审批模块', icon: 'nested' },
  //   children: [
  //     {
  //       path: '/发货申请/发货申请审批',
  //       name: 'Fahuoshenqingshenpi',
  //       component: () => import('@/views/xiaoshouguanli/fahuoshenqing/showSpForm'),
  //       meta: { title: '发货申请审批' }
  //     },
  //     {
  //       path: '/采购合同/采购合同审批',
  //       name: 'Caigouhetongshenpi',
  //       component: () => import('@/views/xiaoshouguanli/caigouhetong/showSpForm'),
  //       meta: { title: '采购合同审批' }
  //     },
  //     {
  //       path: '/销售合同/销售合同审批',
  //       name: 'Xiaoshouhetongshenpin',
  //       component: () => import('@/views/xiaoshouguanli/xiaoshouhetong/showSpForm'),
  //       meta: { title: '销售合同审批' }
  //     },
  //     {
  //       path: '/加工厂档案/加工厂档案审批',
  //       name: 'Jiagongchangdanganshenpi',
  //       component: () => import('@/views/danganguanli/jiagongchangdangan/showSpForm'),
  //       meta: { title: '加工厂档案审批' }
  //     },
  //     {
  //       path: '/客户档案/客户档案审批',
  //       name: 'Kehudanganshenpi',
  //       component: () => import('@/views/danganguanli/kehudangan/showSpForm'),
  //       meta: { title: '客户档案审批' }
  //     },
  //     {
  //       path: '/采购入库/采购入库审批',
  //       name: 'Caigourukushenpi',
  //       component: () => import('@/views/cangkuguanli/caigouruku/showSpForm'),
  //       meta: { title: '采购入库审批' }
  //     },
  //     {
  //       path: '/销售出库/销售出库审批',
  //       name: 'Xiaoshouchukushenpi',
  //       component: () => import('@/views/cangkuguanli/xiaoshouchuku/showSpForm'),
  //       meta: { title: '销售出库审批' }
  //     },
  //     {
  //       path: '/报价单/报价单审批',
  //       name: 'Baojiadanshenpi',
  //       component: () => import('@/views/baoJiaDan/showSpForm'),
  //       meta: { title: '报价单审批' }
  //     }
  //   ]
  // },
  // {
  //   path: '/自定义下拉组件',
  //   name: '自定义下拉组件',
  //   component: () => import('@/layout/mixin/elSelect'),
  //   meta: { title: '自定义下拉组件', icon: 'dashboard' }
  // },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'hash'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
