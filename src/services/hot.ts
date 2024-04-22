import type { PageParams } from '../types/global'
import { http } from '../utils/http'
import type { HotResult, SubTypeItem } from '../types/hot'
// 类型交叉扩展
type hotParams = PageParams & { subType?: string }

/**
 * @param [ string ] url 请求地址
 * @param [ hotParams ] data 请求参数 可选参数
 * @description: 通用热门推荐类型
 */
export const getHotRecommendAPI = (url: string, data?: hotParams) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
