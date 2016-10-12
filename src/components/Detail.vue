<script>
var $ = require('jquery'),
	tool = require('base/tool.js');
	import Navbar from './Navbar.vue'
	module.exports = {
		name: "Detail",
		components: {
		  Navbar
		},
		data: function(){
			return {
				title: '文章详情'
			}
		}
	}
</script>

<template>
<div class="mui-transition-content">
	<Navbar :title="title"></Navbar>
	<div class="mui-content mui-detail-content">
		<h1 class="title">【涨停分析】10月10日 涨停早知道</h1>
		<p class="time">10-10  9:00</p>
		<section>
			<img src="http://img3.imgtn.bdimg.com/it/u=2803080490,4063877091&fm=15&gp=0.jpg">
			<p>正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</p>
		</section>
	</div>
</div>
</template>

<style scoped>
	.mui-vue-content{
		background: #f2f2f2;
	}
</style>