import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import goods from './components/goods.vue';
import seller from './components/seller.vue';
import ratings from './components/ratings.vue';
import error from './components/error.vue';

let routes=[
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings},
  {path: '/', redirect: '/goods'},
  {path:'*',component:error}
];

export default new VueRouter({
  routes
})