<script>
  export default {
    name: "Tab_news",
    props: {
    	news:{
    		type: Array
    	}
    }
  }
</script>

<template>
	<div class="tab-content">
		<a v-link="{name:'detail',params:{id:item.id}}" class="analyze-box" v-for="item in news">
			<p class="analyze-text" v-text="item.content"></p>
			<p class="analyze-time"><span class="mui-pull-right" v-text="item.time"></span></p>
		</a>
	</div>
</template>