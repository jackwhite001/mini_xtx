/*
 * @Author: Mr Bai
 * @Email: 15139968881@163.com
 * @Date: 2024-04-18 18:53:23
 * @FilePath: \vue代码练习\uniApp开发学习\uniapp开发\heima-shop\src\services\home.ts
 * @LastEditTime: 2024-04-19 00:09:22
 * @Description:
 */
// 引入 类型声明文件
import type { BannerList } from '@/types/home'
import { http } from '@/utils/http'
/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerList[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
