<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
        <div class="tab-item">
          <router-link to="/goods" active-class="active">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings" active-class="active">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller" active-class="active">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from "./components/header.vue"

export default {
  name: 'App',
  data() {
    return {
      seller:{}
    }
  },
  mounted() {
    this.$http({
      url:"/static/data.json"
    }).then(res=>{
        res=res.body;
        if (!res.errno) {
          this.seller = res.seller
        }
      }
    )
  },
  components:{
    'v-header':header
  }
};
</script>

<style>
  #app .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);
  }
  #app .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: rgb(77,85,93);
  }
  .active {
    color: rgb(240,20,20);
  }
</style>
