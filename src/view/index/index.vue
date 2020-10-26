<template>
  <div class="index">
    <div class="box" ref='box'>
      <div class="content">
        <p style="font-weight:600;font-size:24px" class="ac">文章推荐</p>
        <p style="font-weight:600;font-size:20px">{{ datas.title }}</p>
        <p>作者：{{ datas.author }}</p>
        <div class="img-box fr" @click="goPath">
          <img :src="imgUrl" class="fr" />
        </div>
        <div class="text" v-html="datas.content" />
      </div>
    </div>
	
    <div class="footers">
      <router-link to="/tool">音乐欣赏</router-link>
    </div>
	<div class="addText" @click="getData">再来一文</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: {},
      imgUrl: "",
	  path:''
    };
  },

  created() {
    this.getData()
    this.axios.get("/api/pcImg").then(res => {
      this.imgUrl = "https://cn.bing.com" + res.data.images[0].url;
	  this.path = res.data.images[0].copyrightlink;
    });
  },
  methods:{
	  getData(){
		  this.axios.get("https://48b7230e-6134-4bf7-a502-9b20fcda1f00.bspapp.com/http/userDocument",{params:{action: 'list'}}).then(res => {
				console.log(res,999)
		      this.datas = res.data.data[0];
		    });
			this.$nextTick(()=>{
				if(this.$refs.box) this.$refs.box.scrollTop = 0;
			})
			
	  },
	  goPath() {
	  	window.open(this.path, '_blank');
	  },
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
  cursor: pointer;
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
.addText{
	position: absolute;
	bottom: 15px;
	right: 10%;
	color: #fff;
	cursor: pointer;
}
.addText:hover{
	color: orangered;
}
</style>
