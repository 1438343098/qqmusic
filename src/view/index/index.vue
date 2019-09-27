<template>
  <div class="index">
    <div class="box">
      <div class="content">
        <p style="font-weight:600;font-size:24px" class="ac">文章推荐</p>
        <p style="font-weight:600;font-size:20px">{{ datas.title }}</p>
        <p>作者：{{ datas.author }}</p>
        <div class="img-box fr">
          <img src=" http://blog.mrabit.com/bing/today" class="fr">
        </div>

        <div v-html="datas.content" />
      </div>
    </div>

    <div class="footers"><router-link to="/tool">音乐欣赏</router-link></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: []
    }
  },

  created() {
    this.axios.get('https://interface.meiriyiwen.com/article/today?dev=1').then(res => {
      this.datas = res.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.index{
  text-align: left;
  color: #000;
  font-size: 18px;

  position: relative;
  height: 100%;
}
.img-box{
  width: 280px;
}
.box{
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  overflow-y: scroll;
  bottom: 50px;
  right: 0px;

}

.footers{
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%)
}
</style>
