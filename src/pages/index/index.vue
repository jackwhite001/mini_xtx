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
</script>

<template>
  <!-- 自定义导航 -->
  <CustomNavbar></CustomNavbar>
  <!-- 滚动容器 -->
  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
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
