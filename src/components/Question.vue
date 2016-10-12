<script>
var $ = require('jquery'),
	tool = require('base/tool.js');
	import Navbar from './Navbar.vue'
	module.exports = {
		name: "Question",
		components: {
		  Navbar
		},
		route: {
			canReuse(){
				return false
			}
		},
		data: function(){
			return {
				title: '我的问股'
			}
		},
		watch: {
			'$route' (to, from) {
		      console.log(to, from);
		    }
		},
		methods:{
			fetchData (){
				console.log('id: ' + this.$route.params.id);
			}
		},
		ready: function(){
			console.log('id: ' + this.$route.params.id);
		}
	}
</script>

<template>
<div class="mui-transition-content">
	<Navbar :title="title"></Navbar>
	<div class="mui-content mui-user-content">
		<div class="user-panle">
			<div class="usre-info">
				<img src="/images/user.png" />
				<h1>微信昵称</h1>
			</div>
		</div>
		<div class="mui-tab-content">
			<div class="tab-content">
				<div class="mui-username">
					<div class="mui-username-content">
						<div class="mui-username-img"><img src="/images/1.png"></div>
						<div class="username-title">
							<p class="username">用户名<span class="mui-time mui-pull-right">10-09 10:00</span></p>
							<p class="problem">问题问题</p>
						</div>
					</div>
					<div class="teacher-answer"><span>老师名 : </span>回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答</div>
				</div>
				<div class="mui-teachername">
					<div class="mui-username-content">
						<div class="mui-username-img"><img src="/images/1.png"></div>
						<div class="username-title">
							<p class="username">老师名<span class="mui-time mui-pull-right">10-09 10:00</span></p>
							<p class="Dance-teachers">老师简介</p>
						</div>
					</div>
					<div class="teacher-SMS">回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答</div>
				</div>
				<div class="mui-username">
					<div class="mui-username-content">
						<div class="mui-username-img"><img src="/images/1.png"></div>
						<div class="username-title">
							<p class="username">用户名<span class="mui-time mui-pull-right">10-09 10:00</span></p>
							<p class="problem">问题问题</p>
						</div>
					</div>
					<div class="teacher-answer"><span>老师名 : </span>回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答</div>
				</div>
				<div class="mui-teachername">
					<div class="mui-username-content">
						<div class="mui-username-img"><img src="/images/1.png"></div>
						<div class="username-title">
							<p class="username">老师名<span class="mui-time mui-pull-right">10-09 10:00</span></p>
							<p class="Dance-teachers">老师简介</p>
						</div>
					</div>
					<div class="teacher-SMS">回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答回答</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>