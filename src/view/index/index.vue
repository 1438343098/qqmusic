<template>
  <div class="index">
    <div class="box">
      <div class="content">
        <p style="font-weight:600;font-size:24px" class="ac">文章推荐</p>
        <p style="font-weight:600;font-size:20px">{{ datas.title }}</p>
        <p>作者：{{ datas.author }}</p>
        <div class="img-box fr">
          <img :src="imgUrl" class="fr" />
        </div>
        <div class="text" v-html="datas.content" />
      </div>
    </div>

    <div class="footers">
      <router-link to="/tool">音乐欣赏</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      imgUrl: ""
    };
  },

  created() {
    this.axios
      .get("https://interface.meiriyiwen.com/article/random?dev=1")
      .then(res => {
        this.datas = res.data.data;
      });
    this.axios.get("/api/pcImg").then(res => {
      this.imgUrl = "https://cn.bing.com" + res.data.images[0].url;
    });
  }
};
</script>

<style lang="less" scoped>
.index {
  text-align: left;
  color: #000;
  font-size: 18px;

  position: relative;
  height: 100%;
}
.img-box {
  width: 280px;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  overflow-y: auto;
  bottom: 50px;
  right: 0px;
}
.text {
  text-indent: 40px;
  & > p {
    margin-top: 20px;
  }
}
.footers {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
