<template>
	<view>
		<!-- <view class="header">
			<view class="parent"><text :class="county == 'baoji' ? 'active' : ''" @click="loadData('baoji')">宝鸡市</text></view>
			<scroll-view scroll-x="true" class="children">
				<text class="children-item">金台区</text>
				<text class="children-item">渭滨区</text>
				<text class="children-item">陈仓区</text>
				<text class="children-item">凤翔县</text>
				<text class="children-item">岐山县</text>
				<text class="children-item">扶风县</text>
				<text class="children-item">宝鸡市</text>
			</scroll-view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// list: [
				// 	{ id: 'jintai', name: '金台区', county: '' },
				// 	{ id: 'weibin', name: '渭滨区', county: '' },
				// 	{ id: 'chencang', name: '陈仓区', county: '' },
				// 	{ id: 'fengxiang', name: '凤翔县', county: '' },
				// 	{ id: 'qishan', name: '岐山县', county: '' },
				// 	{ id: 'fufeng', name: '扶风县', county: '' }
				// ],
				// mapConfig: {
				// 	latitude: '34.35454',
				// 	longitude: '107.38745',
				// 	scale: '8'
				// },
				// candidates: ['111', '222', '333'],
				// industry: '',
				// county: 'baoji'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* .header {
		
		
	}
	.parent {
		width: 120rpx;
		padding: 0 5rpx;
	}
	.children {
		white-space: nowrap;
	}
	.children-item {
		margin-left: 16rpx;
		padding: 0 5rpx;
	}
	.active {
		font-weight: 600;
		color: #903;
		border-bottom: 2px solid #903;
	} */
</style>
