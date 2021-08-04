<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  // watch:{
  //   "$route":function(val){
  //     console.log(val)
  //   }
  // }
}
</script>

<style>
@import './css/reset.css';
#app {
  height: 100vh;
  width: 100vw;
}
</style>
