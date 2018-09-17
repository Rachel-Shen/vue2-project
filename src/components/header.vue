<template>
  <div id="app">
    <div class="header">
      	<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" alt="seller" width="64" height="64">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="showDetails">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetails">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="hideDetails"></i>
				</div>
			</div>
		</transition>
    </div>
  </div>
</template>

<script>
  import star from './star.vue'
  export default {
  	data () {
      return {
        detailShow: false
      };
    },
  	mounted() {
  		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  	},
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    },
    methods: {
      showDetails () {
        this.detailShow = true;
      },
      hideDetails () {
        this.detailShow = false;
      }
    },
  };
</script>

<style>
@import "../common/css/style.css";
#app .header {
	position: relative;
	color: #fff;
	overflow: hidden;
	background: rgba(7,17,27,0.5);
}
.header .content-wrapper {
	position: relative;
	padding: 24px 12px 18px 24px;
	font-size: 0;
}
.header .avatar {
	display: inline-block;
	vertical-align: top;
}
.header img {
	border-radius: 2px;
}
.header .content {
	display: inline-block;
	margin-left: 16px;
}
.header .title {
	margin: 2px 0 8px 0;
}
.title .brand {
	display: inline-block;
	vertical-align: top;
	width: 30px;
	height: 18px;
	background-image: url('../assets/img/brand@2x.png');
	background-size: 30px 18px;
	background-repeat: no-repeat;
}
.title .name {
	margin-left: 6px;
	font-size: 16px;
	line-height: 18px;
	font-weight: bold;
}
.content .description {
	margin-bottom: 10px;
	line-height: 12px;
	font-size: 12px;
}
.content .support .icon {
	vertical-align: top;
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.support .decrease {
	background-image: url('../assets/img/decrease_1@2x.png');
}
.support .discount {
	background-image: url('../assets/img/discount_1@2x.png');
}
.support .guarantee {
	background-image: url('../assets/img/guarantee_1@2x.png');
}
.support .invoice {
	background-image: url('../assets/img/invoice_1@2x.png');
}
.support .special {
	background-image: url('../assets/img/special_1@2x.png');
}
.header .text {
	line-height: 12px;
	font-size: 10px;
}
.header .support-count {
	position: absolute;
	right: 12px;
	bottom: 14px;
	padding: 0 8px;
	height: 24px;
	line-height: 24px;
	border-radius: 14px;
	background: rgba(0,0,0,.2);
}
.support-count .count {
	vertical-align: top;
	font-size: 10px;
}
.support-count .icon-keyboard_arrow_right {
	margin-left: 2px;
	line-height: 24px;
	font-size: 10px;
}
.header .bulletin-wrapper {
	position: relative;
	height: 28px;
	line-height: 28px;
	padding: 0 22px 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background: rgba(7,17,27,0.2);
}
.bulletin-wrapper .bulletin-title {
	display: inline-block;
	vertical-align: top;
	width: 22px;
	height: 12px;
	margin-top: 8px;
	background-image: url('../assets/img/bulletin@2x.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.bulletin-wrapper .bulletin-text {
	vertical-align: top;
	margin: 0 4px;
	font-size: 10px;
}
.bulletin-wrapper .icon-keyboard_arrow_right {
	position: absolute;
	right: 10px;
	top: 9px;
	font-size: 10px;
}
.header .background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	filter: blur(10px);
}
.header .detail {
	position: fixed;
	z-index: 10000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	transition: all 0.5s;
	background: rgba(7,17,27,.8);
	backdrop-filter: blur(10px);
}
.detail.fade-enter-active, .detail.fade-leave-active {
	opacity: 1;
	background: rgba(7,17,27,.8);
}
.detail.fade-enter, .detail.fade-leave-to {
	opacity: 0;
	background: rgba(7,17,27,0);
}
.detail .detail-wrapper {
	min-height: 100%;
	width: 100%;
}
.detail-wrapper .detail-main {
	margin-top: 64px;
	padding-bottom: 64px;
}
.detail-wrapper .name {
	line-height: 16px;
	text-align: center;
	font-size: 16px;
	font-weight: 700;
}
.detail-wrapper .star-wrapper {
	margin-top: 18px;
	padding: 2px 0;
	text-align: center;
}
.detail-main .title {
	display: flex;
	width: 80%;
	margin: 28px auto 24px auto;
}
.detail-wrapper .line {
	flex: 1;
	position: relative;
	top: -6px;
	border-bottom: 1px solid rgba(255,255,255,.2);
}
.title .text {
	padding: 0 12px;
	font-size: 14px;
	font-weight: 700;
}
.detail-wrapper .supports {
	width: 80%;
	margin: 0 auto;
}
.supports .support-item {
	padding: 0 12px;
	margin-bottom: 12px;
	font-size: 0;
}
.support-item:last-child {
	margin-bottom: 0;
}
.supports .icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: top;
	margin-right: 6px;
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.supports .icon.decrease {
	background-image: url('../assets/img/decrease_2@2x.png');
}
.supports .icon.discount {
	background-image: url('../assets/img/discount_2@2x.png');
}
.supports .icon.guarantee {
	background-image: url('../assets/img/guarantee_2@2x.png');
}
.supports .icon.invoice {
	background-image: url('../assets/img/invoice_2@2x.png');
}
.supports .icon.special {
	background-image: url('../assets/img/special_2@2x.png');
}
.support-item .text {
	line-height: 16px;
	font-size: 12px;
}
.detail-wrapper .bulletin {
	width: 80%;
	margin: 0 auto;
}
.bulletin .content {
	padding: 0 12px;
	line-height: 24px;
	font-size: 12px;
	text-align: justify;
}
.detail-close {
	position: relative;
	width: 32px;
	height: 32px;
	margin: -64px auto 0 auto;
	clear: both;
	font-size: 32px;
}
</style>