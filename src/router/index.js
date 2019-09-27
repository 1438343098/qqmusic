import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 首页
const Index = () => import('@/view/index/index.vue')
// 工具分享
const Tool = () => import('@/view/tool/index.vue')
// webview

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '文章推荐',
      component: Index,
      show: true
    },
    {
      path: '/tool',
      name: '音乐欣赏',
      component: Tool,
      show: true
    }
  ]
})

export default router
