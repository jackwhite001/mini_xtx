import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
  const orderParams = ref<{ count?: string; skuId?: string }>()
  const getOrderParams = (params: { count?: string; skuId?: string }) => {
    orderParams.value = {
      count: params.count,
      skuId: params.skuId,
    }
  }
  return { orderParams, getOrderParams }
})
