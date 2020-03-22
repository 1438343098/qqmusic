<template>
    <div class="box">
      <div v-for="(item,index) in myList" :key="index" @click="goPath(item.path)">{{ item.name }}</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      myList: [
        { name: 'leancloud', path: 'https://leancloud.cn/' },
        { name: 'MDN WEB', path: 'https://developer.mozilla.org/zh-CN/' },
        { name: '白鹭', path: 'http://developer.egret.com/cn/' },
        { name: 'vue', path: 'https://cn.vuejs.org/v2/guide/' },
        { name: 'react', path: 'https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/getting-started.html' },
        { name: '赣ICP备20000839号', path: 'http://www.beian.miit.gov.cn' }
      ]
    }
  },
  methods: {
    goPath(path) {
      window.open(path, '_blank')
    }
  }

}
</script>

<style lang="less" scoped>
.box{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;

}
.title,.box{
  color: #fff;
  div{
    cursor: pointer;
    padding: 0 10px;
  }
}
.title{
  color:#ccc
}
</style>
