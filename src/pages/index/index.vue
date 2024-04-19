<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import { getHomeBannerAPI, getHomeCategoryAPI } from '@/services/home'
import type { BannerItem, CategoryItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
//
const bannerList = ref<BannerItem[]>([])
const categoryList = ref<CategoryItem[]>([])
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
onLoad(() => {
  getBanner()
  getCategory()
})
</script>

<template>
  <!-- 自定义导航 -->
  <CustomNavbar></CustomNavbar>
  <!-- 自定义轮播图 -->
  <XtxBanner :list="bannerList"></XtxBanner>
  <!-- 自定义分类面板 -->
  <CategoryPanel :list="categoryList"></CategoryPanel>
  <view class="index"> </view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>
