<template>
  <div class="index">
    <div v-for="(item,index) in aside" :key="index" class="aside">
      <router-link :to="item.path">
        <span style="display:block;"> {{ item.name }}</span>
      </router-link>
    </div>
    <div class="color">
      <p>{{ datas.title }}</p>
      <p>{{ datas.dynasty }} -- {{ datas.author }}</p>
      <br>
      <p v-for="(item,index) in datas.content" :key="index">{{ item.split("，")[0] }}，<br>{{ item.split("，")[1] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aside: [],
      datas: {}
    }
  },
  created() {
    this.aside = this.$router.options.routes.filter((item) => {
      if (item.show) {
        return item
      }
    })
    this.$load(res => {
      this.datas = res.data.origin
    })
  }
}
</script>

<style lang="less" scoped>
.index{
    .aside{
        margin: 0 auto 5px;
        background: rgba(46, 99, 199, 0.733);
        height: 50px;
        width: 80%;
        border:1px solid rgba(92, 74, 172, 0.9);
        line-height: 50px;
        &:hover{
            background: rgba(92, 74, 172, 0.9);
        }

    }
    .color{
      text-align: center;
      color: #fff;
      width: 80%;
       margin: 0 auto 5px;
    }
}

</style>
