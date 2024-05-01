<script setup lang="ts">
import { useAddressStore } from '@/stores/modules/address'
import type { AddressItem } from '@/types/address'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { computed, provide, ref } from 'vue'
const addressStore = useAddressStore()
addressStore.$patch(() => {
  addressStore.selectedAddress = addressStore.addressList.find((v) => v.isDefault)
})
const emit = defineEmits<{
  (event: 'close'): void
}>()
const address = defineProps<{
  addressList: AddressItem[]
}>()

const selectedAdd = computed(() => {
  return addressStore.selectedAddress
})
// 用来修改地址的函数
const onChangeAddress = (item: AddressItem) => {
  // 管理修改地址的仓库
  addressStore.changeSelectedAddress(item)
}
// 确认选择地址
const onConfirm = () => {
  emit('close')
}
defineExpose({
  selectedAdd,
})
// console.log(address)
</script>

<template>
  <view class="address-panel">
    <!-- 关闭按钮 -->
    <text class="close icon-close" @tap="$emit('close')"></text>
    <!-- 标题 -->
    <view class="title">配送至</view>
    <!-- 内容 -->
    <view class="content">
      <view
        class="item"
        v-for="item in address.addressList"
        :key="item.id"
        @tap="($event) => onChangeAddress(item)"
      >
        <view class="user">{{ item.receiver }} {{ item.contact }}</view>
        <view class="address">{{ item.fullLocation }} {{ item.address }}</view>
        <text class="icon" :class="selectedAdd!.id === item.id ? 'icon-checked' : ''"></text>
      </view>
    </view>
    <view class="footer">
      <view class="button primary"> 新建地址 </view>
      <view v-if="address.addressList.length !== 0" @tap="onConfirm" class="button primary"
        >确定</view
      >
    </view>
  </view>
</template>

<style lang="scss">
.address-panel {
  padding: 0 30rpx;
  border-radius: 10rpx 10rpx 0 0;
  position: relative;
  background-color: #fff;
}

.title {
  line-height: 1;
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: normal;
  border-bottom: 1rpx solid #ddd;
  color: #444;
}

.close {
  position: absolute;
  right: 24rpx;
  top: 24rpx;
}

.content {
  min-height: 300rpx;
  max-height: 540rpx;
  overflow: auto;
  padding: 20rpx;
  .item {
    padding: 30rpx 50rpx 30rpx 60rpx;
    background-size: 40rpx;
    background-repeat: no-repeat;
    background-position: 0 center;
    background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/locate.png);
    position: relative;
  }
  .icon {
    color: #999;
    font-size: 40rpx;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: 0;
  }
  .icon-checked {
    color: #27ba9b;
  }
  .icon-ring {
    color: #444;
  }
  .user {
    font-size: 28rpx;
    color: #444;
    font-weight: 500;
  }
  .address {
    font-size: 26rpx;
    color: #666;
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0 40rpx;
  font-size: 28rpx;
  color: #444;

  .button {
    flex: 1;
    height: 72rpx;
    text-align: center;
    line-height: 72rpx;
    margin: 0 20rpx;
    color: #fff;
    border-radius: 72rpx;
  }

  .primary {
    color: #fff;
    background-color: #27ba9b;
  }

  .secondary {
    background-color: #ffa868;
  }
}
</style>
