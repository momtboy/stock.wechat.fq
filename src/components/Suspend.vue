<script>
  export default {
    name: "Suspend",
    props: {
      isshow:{
        type: Boolean
      }
    }
  }
</script>

<template>
<div class="mui-fixd-sus">
  <a href="" class="l" title="老师助理"></a>
  <a v-link="{name:'question'}" class="m" v-show="isshow" title="我的问股"></a>  
</div>
</template>
