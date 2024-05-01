import { getMemberAddressAPI } from '@/services/address'
import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAddressStore = defineStore(
  'address',
  () => {
    const manageAddress = ref<AddressItem[]>([])
    const selectedAddress = ref<AddressItem>()
    const addressList = ref<AddressItem[]>([])
    // const defalutAddree = ref<AddressItem[]>()
    // 获取收货地址列表数据
    const getMemberAddress = async () => {
      const res = await getMemberAddressAPI()
      // console.log(res)
      addressList.value = res.result
      let isDefault = addressList.value.every((item) => item.isDefault === 0)
      if (isDefault) {
        addressList.value[0].isDefault = 1
      }
      manageAddress.value = addressList.value
    }
    const changeSelectedAddress = (address: AddressItem) => {
      selectedAddress.value = address
    }
    const defaultAddress = computed(() => {
      return addressList.value.find((item) => item.isDefault === 1)
    })
    return {
      defaultAddress,
      addressList,
      manageAddress,
      selectedAddress,
      getMemberAddress,
      changeSelectedAddress,
    }
  },
  {
    // 在h5端 持久化
    // persist: true,
    // 小程序端
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
