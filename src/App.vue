<template>
	<div id="app">
		<el-container>
			<el-header><Header /></el-header>
			<el-container>
				<el-aside width="200px"><Aside /></el-aside>
				<el-container>
					<el-main><router-view /></el-main>
				</el-container>
			</el-container>
			<el-footer height="80px"><Footer /></el-footer>
		</el-container>
		<div class="bgName" @click="goPath" :title="'转到必应查找' + text">{{ text }}</div>
	</div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Aside from './components/Aside.vue';

export default {
	name: 'App',
	data() {
		return {
			text: '',
			path: ''
		};
	},
	components: {
		Footer,
		Header,
		Aside
	},
	mounted() {
		this.axios.get('https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=2&mkt=zh-CN').then(res => {
			document.body.style.backgroundImage = 'url(https://cn.bing.com' + res.data.images[1].url + ')';
			this.text = res.data.images[1].copyright;
			this.path = res.data.images[1].copyrightlink;
		});
	}, 
	methods: {
		goPath() {
			window.open(this.path, '_blank');
		}
	}
};
</script>

<style lang="less">
/* 重置样式 */
@import './assets/css/reset.css';

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	position: absolute;
	top: 0;
	width: 1000px;
	left: 50%;
	transform: translateX(-50%);
	bottom: 0;
	opacity: 0.95;
}
.bgName {
	position: fixed;
	left: -200px;
	width: 150px;
	top: 100px;
	font-size: 20px;
	color: #fff;
}
.bgName:hover {
	cursor: pointer;
}
.el-header,
.el-footer {
	background-color: rgba(140, 173, 233, 0.18);
	color: #333;
	text-align: center;
	line-height: 60px;
}
.el-footer {
	position: absolute;
	bottom: 0;
	left: 0px;
	right: 0;
	height: 80px;
}
.el-aside {
	background-color: rgba(46, 77, 111, 0.66);
	color: #333;
	text-align: center;
	position: absolute;
	bottom: 80px;
	left: 0;
	top: 60px;
}

.el-main {
	background-color: rgba(197, 197, 197, 0.96);
	color: #333;
	text-align: center;
	position: absolute;
	bottom: 80px;
	right: 0;
	left: 200px;
	top: 60px;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
}
</style>
