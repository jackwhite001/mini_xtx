/*
 * @Author: Mr Bai
 * @Email: 15139968881@163.com
 * @Date: 2024-04-18 18:53:23
 * @FilePath: home.ts
 * @LastEditTime: 2024-04-19 16:19:00
 * @Description:
 */
// 引入 类型声明文件
import type { BannerItem,CategoryItem } from '@/types/home'
import { http } from '@/utils/http'
/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
/**
 * 首页-前台分类-小程序
 */
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
