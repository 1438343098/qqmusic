<template>
  <div class="index">
    <div class="box">
      <div class="content">
        <aplayer
          v-if="JSON.stringify(musicList) != '{}' && isRouterAlive"
          ref="music"
          autoplay
          :music="musicList"
          repeat="repeat-all"
          :show-lrc="true"
        />
        <div v-for="(item,index) in musicLists" :key="index" class="lists" @click="plays(item)">
          <div>
            <div class="imte-img">
              <img :src="item.picUrl.replace(/http:\/\//, 'https://')" />
            </div>
            <span>{{ item.name }}</span>
          </div>
          <div>{{ item.song.artists.map(item=>item.name).join(",") }}</div>
        </div>
      </div>
    </div>
    <div class="footers">
      <router-link to="/">文章推荐</router-link>
    </div>
  </div>
</template>

<script>
import aplayer from "vue-aplayer";
export default {
  components: { aplayer },
  data() {
    return {
      datas: [],
      playList: [],
      musicLists: [],
      musicList: {},
      item: {},
      isRouterAlive: true
    };
  },
  created() {
    this.axios.get("/api/music/v1/personalized/newsong").then(res => {
      this.musicLists = res.data.result;
      this.plays(this.musicLists[0]);
    });
  },
  methods: {
    initData1() {
      return this.axios.get("/api/music/v1/music/url", {
        params: {
          id: this.item.id,
          br: this.item.song.hMusic.bitrate
        }
      });
    },

    initData2() {
      return this.axios.get("/api/music/v1/music/detail", {
        params: {
          id: this.item.id
        }
      });
    },
    initData3() {
      // 歌词
      return this.axios.get("/api/music/v1/lyric", {
        params: {
          id: this.item.id
        }
      });
    },
    plays(item) {
      this.item = Object.assign({}, item);

      this.axios
        .all([this.initData1(), this.initData2(), this.initData3()])
        .then(
          this.axios.spread((acct, acct2, acct3) => {
            this.$set(
              this.musicList,
              "src",
              acct.data.data[0].url.replace(/http:\/\//, "https://")
            );

            this.$set(this.musicList, "title", acct2.data.songs[0].name);
            this.$set(
              this.musicList,
              "artist",
              acct2.data.songs[0].ar.map(item => item.name).join(",")
            );
            this.$set(this.musicList, "pic", acct2.data.songs[0].al.picUrl.replace(/http:\/\//, 'https://'));

            this.$set(this.musicList, "lrc", acct3.data.lrc.lyric);
            this.isRouterAlive = false;
            this.$nextTick(() => (this.isRouterAlive = true));
          })
        );
    }
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
.item {
  background: #fff;
  height: 60px;
  width: 100%;
  line-height: 60px;
  margin-bottom: 15px;
  padding: 0 20px;
  &:hover {
    background: pink;
  }
}
.lists {
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid pink;
  padding: 20px 10px;
  &:hover {
    background: rgb(186, 255, 195);
  }
}

.imte-img {
  display: inline-block;
  width: 30px;
  margin-right: 15px;
}
.box {
  position: absolute;
  top: 0px;
  left: 0;
  padding: 20px;
  overflow-y: auto;
  bottom: 50px;
  right: 0px;
}

.footers {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
