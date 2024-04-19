<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotPanelAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotPanelItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { XtxGuessInstance } from '@/types/component'

const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
const hotPanelList = ref<HotPanelItem[]>([])
// 获取猜你喜欢实例 创建组件实例
const guessRef = ref<XtxGuessInstance>()
// 判断是否结束刷新动画
const isTriggered = ref(false)

const getBanner = async () => {
  const res = await getHomeBannerAPI()
  // console.log(res)
  bannerList.value = res.result
}

const getCategory = async () => {
  const res = await getHomeCategoryAPI()
  // console.log(res)
  categoryList.value = res.result
}
const getHotPanel = async () => {
  const res = await getHomeHotPanelAPI()
  // console.log(res)
  hotPanelList.value = res.result
}

onLoad(() => {
  getBanner()
  getCategory()
  getHotPanel()
})

// 滑动触底
const onScrolltolower = async () => {
  guessRef.value?.getGuessLike()
}
// 自定义下拉刷新 内触发
const onRefresherrefresh = async () => {
  // console.log('自定义下拉菜单被刷新')
  // 重新加载页面数据
  // 开始动画
  isTriggered.value = true
  //树新数据
  // await getBanner()
  // await getCategory()
  // await getHotPanel()
  // 采用 promise.all 多次请求
  //   Promise.all()
  // 1、Promise.all方法可以把多个promise实例包装成一个新的promise实例；
  // Promise.all([promise1,promise2]):Promise---最终返回Promise实例；
  // 2.全部加载成功 则返回所有promise实例中resolve（）回来带的参数，按数组中一一对应的顺序所集合的数组
  // 若任意有一个失败 ，立即决议失败，将失败的promise实例（reject()中参数）传递给我们；
  // 3.若Promise.all([ ])中，数组为空数组，则立即决议为成功执行resolve( )；
  // 重置猜你喜欢数据
  guessRef.value?.resetData()
  await Promise.all([getBanner(), getCategory(), getHotPanel(), guessRef.value?.getGuessLike()])
  // 关闭冻哈
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航 -->
  <CustomNavbar></CustomNavbar>
  <!-- 滚动容器 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    :refresher-triggered="isTriggered"
    class="scroll-view"
    scroll-y
  >
    <!-- 自定义轮播图 -->
    <XtxBanner :list="bannerList"></XtxBanner>
    <!-- 自定义分类面板 -->
    <CategoryPanel :list="categoryList"></CategoryPanel>
    <!-- 热门推荐 -->
    <HotPanel :list="hotPanelList"></HotPanel>
    <!-- 猜你喜欢 -->
    <XtxGuess ref="guessRef"></XtxGuess>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
