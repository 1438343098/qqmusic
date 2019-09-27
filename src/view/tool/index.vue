<template>
  <div class="index">
    <div class="music">
      <aplayer autoplay :music="musicList" />
    </div>
    <div class="box">

      <div class="content">
        <div v-for="(item,index) in datas" :key="index" class="item" @click="play(item,index)">
          <p>
            <span class="fl imte-img"><img :src="`http://imgcache.qq.com/music/photo/album_300/${item.data.albumid%100}/300_albumpic_${item.data.albumid}_0.jpg`" alt=""></span>
            <span class="fl">{{ item.data.songname }} -- {{ item.data.singer[0].name }} </span>
            <span class="fr">{{ item.data.albumname }}</span>
          </p>
        </div>

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
      musicList: {
        title: 'youkao100',
        author: 'youkao100',
        url: 'http://ting6.yymp3.net:86/new27/underlover/1.mp3',
        pic: '',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      }
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
      })
    })
  },
  methods: {
    // 暂定
    // 歌词接口、http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=0020VnHM0U9uNh&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1569582451543
    play(item, index) {
      this.musicList = {
        title: item.data.songname,
        author: item.data.singer[0].name,
        url: `http://ws.stream.qqmusic.qq.com/C400${this.playList[index].purl}.m4a?fromtag=0&guid=126548448`,
        pic: `http://imgcache.qq.com/music/photo/album_300/${item.data.albumid % 100}/300_albumpic_${item.data.albumid}_0.jpg`,
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'

      }
    }
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
  top: 80px;
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
.music{
  position: absolute;
  top: 0px;
  width: 100%;
  left: 50%;
  transform: translateX(-50%)
}
</style>
