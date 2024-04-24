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
