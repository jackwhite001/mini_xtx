<script setup lang="ts">
//
import type { HotPanelItem } from '@/types/home'
defineProps<{
  list: HotPanelItem[]
}>()
</script>

<template>
  <!-- 推荐专区 -->
  <view class="panel hot">
    <view class="item" v-for="item in list" :key="item.id">
      <view class="title">
        <text class="title-text">{{ item.title }}</text>
        <text class="title-desc">{{ item.alt }}</text>
      </view>
      <!-- 使用query传参 type 页面类型 -->
      <navigator hover-class="none" :url="`/pages/hot/hot?type=${item.type}`" class="cards">
        <image
          class="image"
          mode="aspectFit"
          v-for="img in item.pictures"
          :key="img"
          :src="img"
        ></image>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
@import './styles/HotPanel.scss';
</style>
