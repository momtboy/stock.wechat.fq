<script>
var $ = require('jquery'),
	tool = require('base/tool.js'),
	layer = require('layer');


	import  tab_fq from './tab/tab_fq.vue';
	import  tab_news from './tab/tab_news.vue';
	module.exports = {
		name: "Home",
		components: {
		  	view_0 : tab_fq,
        	view_1 : tab_news
		},
		data(){
			return {
				tabs: [
					{tabName:'首席诊股'},
                	{tabName:'投资参考'}
				],
				selected:0,
            	currentView:'view_0',
            	news: [
            		{id:1,time:'10-10',content:'【午盘分析】两市缩量整理沪指涨0.14%重回3000点 权重低迷'},
            		{id:2,time:'10-11',content:'【午盘分析】两市缩量整理沪指涨0.14%重回3000点 权重低迷'},
            		{id:3,time:'10-11',content:'【午盘分析】两市缩量整理沪指涨0.14%重回3000点 权重低迷'},
            		{id:4,time:'10-12',content:'【午盘分析】两市缩量整理沪指涨0.14%重回3000点 权重低迷'}
            	],
            	fqlist: [

            	],
            	meassage:''
			}
		},
		methods: {
			choose: function(index){
				this.selected=index;
	            this.currentView='view_'+index;
			},
			open: function(){
				var indexs = layer.open({
				  type: 1,
				  content: $('#tpl-popup-content').html(),
				  anim: 'up',
				  style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;',
				  success: function(elem){
				  	var $elem = $(elem), message = $elem.find('#message');
			  		tool.targetEvent({elem:'a[data-type="close"]'},function(){
			  			layer.close(indexs);
			  		});
			  		tool.targetEvent({elem:'#sendMessage'},function(){
			  			alert(1);
			  		})
				  }
				});
			}
		}
	}  
</script>

<template>
<div class="mui-transition-content">
	<div class="mui-content">
		<div class="mui-tab">
			<a href="javascript:void(0);" 
				v-for="tab in tabs" @click.prevent="choose($index)" 
				:class="$index === selected ? 'mui-control-item mui-active' :  'mui-control-item'">{{tab.tabName}}</a>
		</div>
		<div class="mui-tab-content">
			<component :is="currentView" :news="news" :fqlist="fqlist" keep-alive  transition="fade" transition-mode="out-in"></component>
			<footer class="mui-footer" v-show="!selected" transition="fade" transition-mode="out-in">
				<div class="input-answer"><button class="mui-button mui-pull-center" @click.prevent="open()">输入您的问题</button></div>
			</footer>
		</div>
	</div> <!-- mui-content end-->

<script type="text/html" id="tpl-popup-content">
<div class="mui-popup-box">
	<header class="popup-header clearfix">
		<span class="mui-pull-left">您的问题</span>
		<a href="javascript:void(0)" class="mui-pull-right" data-type="close" title="关闭"></a>
	</header>
	<div class="popup-content">
		<div class="box">
			<textarea placeholder="点击此处输入您的问题" autocomplete="off" id="message" maxlength="150"></textarea>
		</div>
		<p class="subbtn"><button id="sendMessage">发送</button></p>
	</div>
</div>
</script>

</div>
</template>



<style scoped>
	@import '/css/layer.css';
</style>