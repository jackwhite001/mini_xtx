// 商品详情

import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

// GET/goods

// 规格集合一定要和 skus集合下的space 顺序保持一致

/**
 * @param [ string ] id
 * @return [ type ] get request
 * @description:  商品详情
 */
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: '/goods',
    data: {
      id,
    },
  })
}
