<template>
	<view id="container">
		<view class="header">
			<scroll-view scroll-x="true" class="county">
				<text v-for="(item, index) in countyList" :key="index" class="county-item" :class="county == item.id ? 'active' : ''" @click="loadData(item.id)">
					{{ item.name }}
				</text>
			</scroll-view>
		</view>

		<view class="options">
			<uni-combox :candidates="candidates" :placeholder="placeholder" v-model="industry" @input="search" class="select-box"></uni-combox>
			<view class="project-num" v-if="isProject"><text>重点项目：34个</text></view>
			<view class="icon-box">
				<view class="icon-item">
					<uni-icons type="map" size="40"></uni-icons>
					<text>地图</text>
				</view>
				<view class="icon-item">
					<uni-icons type="list" size="40"></uni-icons>
					<text>列表</text>
				</view>
				<view class="icon-item">
					<uni-icons type="headphones" size="40"></uni-icons>
					<text>联系我们</text>
				</view>
			</view>
		</view>
		<view class="map">
			<map :latitude="mapConfig.latitude" :longitude="mapConfig.longitude" :scale="mapConfig.scale" :markers="markers" :polyline="polyline" :polygons="polygon" :circles="circles"></map>
		</view>
		<view class="blank"></view>
	</view>
</template>

<script>
import uniCombox from '@/components/uni-combox/uni-combox';
// import jsonArr from './data.js';
export default {
	components: { uniCombox },
	data() {
		return {
			countyList: [
				{ id: 'baoji', name: '宝鸡市', county: '' },
				{ id: 'jintai', name: '金台区', county: '' },
				{ id: 'weibin', name: '渭滨区', county: '' },
				{ id: 'chencang', name: '陈仓区', county: '' },
				{ id: 'fengxiang', name: '凤翔县', county: '' },
				{ id: 'qishan', name: '岐山县', county: '' },
				{ id: 'fufeng', name: '扶风县', county: '' }
			],
			mapConfig: {
				latitude: '34.35454',
				longitude: '107.38745',
				scale: '8'
			},
			placeholder: '请选择企业',
			candidates: ['111', '222', '333'],
			industry: '',
			county: 'baoji',
			isProject: false,

			markers: [
				{
					// id: 1,
					// latitude: '34.35454',
					// longitude: '107.38745',
					// iconPath: '../../static/logo.png'
				}
			],
			polyline: [],
			polygon: [],
			circles: []
		};
	},
	created() {
		this.polyline = [{
			points: jsonArr,
			color: "#FF0000",
			width: 2
		}];
		this.polygon = [
			// {
			// 	points: jsonArr,
			// 	strokeColor: '#08a6dc',
			// 	strokeWidth: 2,
			// 	fillColor: '#172238AA'
			// }
		];
		
		this.circles = [{
			longitude: 107.13126,
			latitude: 34.39029,
			radius: 5000,
			fillColor: '#EFD223'
		},
		{
			longitude: 107.38745,
			latitude: 34.35454,
			radius: 5000,
			fillColor: '#FF8934'
		},
		{
			longitude: 107.90022,
			latitude: 34.37527,
			radius: 5000,
			fillColor: '#FF3333'
		}]
		console.log(this.circles);
	},
	onTabItemTap(options) {
		debugger;
		console.log(options);
		switch (options.index) {
			case 0:
				this.placeholder = '请选择企业';
				break;
			case 1:
				debugger;
				this.placeholder = '请输入园区';
				break;
			case 2:
				debugger;
				this.placeholder = '请输入关键字';
				break;
			case 3:
				debugger;
				this.placeholder = '请输入产业名称';
				this.isProject = true;
				break;
			case 4:
				debugger;
				this.placeholder = '请输入产业名称';
				break;
			default:
				return;
		}
	},
	methods: {
		search() {},
		loadData(county) {
			this.county = county;
		}
	}
};
</script>

<style lang="less">
#container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	.header {
		width: 95%;
		height: 80rpx;
		font-size: 32rpx;
		margin: 0 auto;
		line-height: 80rpx;
		.county {
			white-space: nowrap;
			.county-item {
				margin-right: 16rpx;
				padding: 5rpx 8rpx;
			}
		}
		.active {
			font-weight: 600;
			color: #903;
			border-bottom: 2.5px solid #903;
		}
	}
	.options {
		width: 90%;
		height: 180rpx;
		margin: 0 auto;
		position: relative;
		.project-num {
			width: 40%;
			position: absolute;
			bottom: 20rpx;
			color: #903;
			font-size: 28rpx;
			font-weight: bold;
		}
		.icon-box {
			display: inline-flex;
			width: 100%;
			margin-top: 10rpx;
			justify-content: flex-end;
			.icon-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 14rpx;
				text {
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
	.map {
		width: 100%;
		flex: 1;
		map {
			width: 100%;
			height: 100%;
		}
	}
	.blank {
		width: 100%;
		height: 24rpx;
		background-color: #fff;
	}
}
</style>
