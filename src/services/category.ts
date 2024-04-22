import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

/** GET/category/top
 * @return [ http ]
 * @description: 分类微信小程序
 */
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
