<template>
  <div class="index">
    <div class="box">
      <div class="content">
      	<aplayer autoplay :music="musicList" :list="musicLists" repeat="repeat-all"/>
      </div>
    </div>
    <div class="footers"><router-link to="/">文章推荐</router-link></div>
  </div>
</template>

<script>

import aplayer from 'vue-aplayer'
export default {
  components: { aplayer },
  data() {
    return {
      datas: [],
      playList: [],
      musicLists:[],
      musicList: {}
    }
  },
  created() {
    this.axios.get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&topid=26&needNewCode=1&uin=0&tpl=3&page=detail&type=top&platform=h5&jsonpCallback=jp1').then(res => {
      this.datas = JSON.parse(res.data.substring(5, res.data.length - 2)).songlist
      // const datass = res.data.replace('jp1(', '(,')
      const songmids = []
      const songtypes = []
      this.datas.forEach(item => {
        songmids.push(item.data.songmid)
        songtypes.push(item.data.songtype)
      })

      this.axios.post('http://ustbhuangyi.com/music/api/getPurlUrl', { comm: {
        'g_tk': 5381,
        'inCharset': 'utf-8',
        'outCharset': 'utf-8',
        'notice': 0,
        'format': 'json',
        'platform': 'h5',
        'needNewCode': 1,
        'uin': 0
      }, req_0: {
        method: 'CgiGetVkey',
        module: 'vkey.GetVkeyServer',
        param: {
          guid: '2697948775',
          loginflag: 0,
          platform: '23',
          uin: '0',
          songmid: songmids,
          songtype: songtypes
        }
      }
      }).then(res => {
        console.log(res)
        this.playList = res.data.req_0.data.midurlinfo
        this.playList.forEach((item,index)=>{
        	this.musicLists.push({
		        title: this.datas[index].data.songname,
		        author: this.datas[index].data.singer[0].name,
		        url: `http://ws.stream.qqmusic.qq.com/C400${item.purl}.m4a?fromtag=0&guid=126548448`,
		        pic: `http://imgcache.qq.com/music/photo/album_300/${this.datas[index].data.albumid % 100}/300_albumpic_${this.datas[index].data.albumid}_0.jpg`
		      })
        })
        this.musicList = this.musicLists[0]
      })
    })
  },
  methods: {
    // 暂定
    // 歌词接口、http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=0020VnHM0U9uNh&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1569582451543
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
.item{
  background: #fff;
  height: 60px;
  width: 100%;
  line-height: 60px;
  margin-bottom: 15px;
  padding: 0 20px;
  &:hover{
    background: pink;
  }
}
.imte-img{
  width: 40px;
  margin-right: 15px;
}
.box{
  position: absolute;
  top: 0px;
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
