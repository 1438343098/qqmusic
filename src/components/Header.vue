<template>
  <div class="index">
    <div class="fl">
      <img class="logo" src="~@/assets/img/logo.jpg">
    </div>
    <div v-for="(item,index) in list" :key="index" class="fr list">
      <span @click="goPath(item)">
        {{ item.name }}
      </span>
      <span v-if="index != 0" style="padding:0;color:#fff">|</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: '我的github', path: 'Webview', data: 'https://github.com/1438343098' },
        { name: '我的简书', path: 'Webview', data: 'https://www.jianshu.com/u/b5ba2243482f' }
      ]
    }
  },
  methods: {
    goPath(item) {
      window.open(item.data, '_blank')
    }
  }
}
</script>

<style lang="less" scoped>
.index{
  width: 100%;
  height: 100%;
  line-height: 60px;
}
.logo{
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.list{
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: flex-start;
  &>span{
    display: inline-block;
    padding: 0 40px;
    &:hover{
      color: red;
    }
  }

}
</style>
