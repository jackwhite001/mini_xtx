<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHomeGoodsGuessLikeAPI } from '../services/home'
import type { PageParams } from '../types/global'
import type { GuessItem } from '@/types/home'
//

const guessList = ref<GuessItem[]>([])
// 终止标志
const finish = ref(false)
//// 分页参数 将可选参数转为 必选  使用泛型工具 Required
// 防止数据出现undefined 无法操作
const pageParams: Required<PageParams> = {
  page: 29,
  pageSize: 10,
}
// 获取猜你喜欢数据
// 请求参数：Query:
/*
需要获取当期前页面id
page	否	1	分页的页码
pageSize	否	10	每页数据的条数
*/
const getGuessLike = async () => {
  // 判断滚动是否到最后一页
  if (finish.value) {
    return uni.showToast({ icon: 'none', title: '没有更多数据' })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // console.log(res)
  // guessList.value = res.result.items
  // 数组追加
  guessList.value.push(...res.result.items)
  // 页码累加
  // 判断页码 pageParams.page第几页的页码  res.result.pages 总的的页码
  if (pageParams.page < res.result.pages) {
    pageParams.page++
  } else {
    finish.value = true
  }
}

// 组件挂载完毕调用API
onMounted(() => {
  getGuessLike()
})
// 暴露属性方法
defineExpose({
  getGuessLike,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=4007498`"
    >
      <image class="image" mode="aspectFill" :src="item.picture"></image>
      <view class="name">{{ item.desc }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text"> {{ finish ? '已经加载完成~':'正在加载...' }} </view>
</template>

<style lang="scss">
:host {
  display: block;
}
/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;
  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }
  .image {
    width: 304rpx;
    height: 304rpx;
  }
  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }
  .small {
    font-size: 80%;
  }
}
// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>
