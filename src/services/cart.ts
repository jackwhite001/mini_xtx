import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

/**
 * @param [ object ] data 请求体参数
 * @description: 加入购物车API接口
 */
export const postMemberCartAPI = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}
/**
 * 加入购物车
 * @param data 请求体参数
 */
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}
/**
 * 删除购物车
 * @param data 请求体参数 ids skuId 集合
 */
export const deleteMemberCartAPI = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data,
  })
}

/**
 * @param skuId skuId
 * @param data selected 选中状态 count 商品数量
 * @description: 修改购物车商品 及数量
 */
export const putMemberCartBySkuIdAPI = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}
/**
 * @param [ object ] data selected 循环中状态
 * @description: 购物车全选 取消购物车
 */
export const putMemberCartSelectedAPI = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
