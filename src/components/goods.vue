<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
						<span class="text">
							<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list food-list-hook">
						<h1 class="title">{{item.name}}</h1>
						<ul>
							<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
								<div class="icon">
									<img :src="food.icon" width="57" height="57" />
								</div>
								<div class="goods-content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}份</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
									</div>
									<div class="cartControl-wrapper">
										<cartcontrol :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		</div>
		<food :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
    import BScroll from 'better-scroll';
	import shopcart from './shopcart';
	import cartcontrol from './cartcontrol';
	import food from './food';

	export default{
		name: 'goods',
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {},
				classMap: ['decrease','discount','special','invoice','guarantee']
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		},
		created() {
			this.$http({
		      url:"/static/data.json"
		    }).then(res=>{
		        res=res.body;
		        if (!res.errno) {
		          	this.goods = res.goods
		          	this.$nextTick( ()=> {
						this._initScroll();
						this._calculateHeight();
					})
		        }
		    })
		},
		computed: {
			currentIndex() {
				for( let i = 0, l = this.listHeight.length; i < l; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if( !height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count) {
							foods.push(food);
						}
					});
				});
				return foods
			}
		},
		methods: {
			selectMenu(index,event) {
				if(!event._constructed) {
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},
			selectFood(food, event) {
		        if (!event._constructed) {
		          return;
		        }
		        this.selectedFood = food;
		        this.$refs.food.show();
		    },
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					probeType: 3,
					click: true
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height);
				for( let i = 0, l = foodList.length; i < l; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	};
</script>

<style>
.goods {
	display: flex;
	position: absolute;
	top: 175px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
.goods .menu-wrapper {
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.menu-wrapper .menu-item {
	display: table;
	height: 54px;
	width: 56px;
	padding: 0 12px;
	line-height: 14px;
}
.menu-item .icon {
	vertical-align: top;
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 2px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.menu-item .decrease {
	background-image: url('../assets/img/decrease_3@2x.png');
}
.menu-item .discount {
	background-image: url('../assets/img/discount_3@2x.png');
}
.menu-item .guarantee {
	background-image: url('../assets/img/guarantee_3@2x.png');
}
.menu-item .invoice {
	background-image: url('../assets/img/invoice_3@2x.png');
}
.menu-item .special {
	background-image: url('../assets/img/special_3@2x.png');
}
.menu-item .text {
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	font-size: 12px;
	border-bottom: 1px solid rgba(7,17,27,.1);
}
.menu-wrapper .current {
	position: relative;
	z-index: 10;
	margin-top: -1px;
	background: #fff;
}
.current .text {
	color: #00a0dc;
	border:none;
}
.goods .foods-wrapper {
	flex: 1;
	background: #fff;
}
.food-list .title {
	padding-left: 14px;
	height: 26px;
	line-height: 26px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147,153,159);
	background: #f3f5f7;
}
.food-list .food-item {
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
	border-bottom: 1px solid rgba(7,17,27,.1);
}
.food-item:last-child {
	border: none;
	margin-bottom: 0;
}
.food-item .icon {
	flex: 0 0 57px;
	margin-right: 10px;
}
.food-item .goods-content {
	position: relative;
	flex: 1;
}
.goods-content .name {
   margin: 2px 0 8px 0;
   height: 14px;
   line-height: 14px;
   font-size: 14px;
   color: rgb(7,17,27);
}
.goods-content .desc, .goods-content .extra {
	font-size: 10px;
	color: rgb(147,153,159);
}
.goods-content .desc {
	margin-bottom: 8px;
	line-height: 12px;
}
.goods-content .extra {
	line-height: 10px;
}
.extra .count {
	margin-right: 12px;
}
.goods-content .price {
	font-weight: 700;
	line-height: 24px;
}
.price .now {
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.price .old {
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.goods-content .cartControl-wrapper {
	position: absolute;
	right: 0;
	bottom: -6px;
}
</style>