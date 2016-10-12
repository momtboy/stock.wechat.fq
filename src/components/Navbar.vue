<script>
  export default {
    name: "Navbar",
    props: {
    	title: {
    		type: String
    	}
    }
  }

</script>

<template>
  <header id="header" class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" onclick="window.history.go(-1)"></a>
    <h1 class="mui-title" v-text="title"></h1>
  </header>
</template>
