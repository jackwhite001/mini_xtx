/*
 * @Author: Mr Bai
 * @Email: 15139968881@163.com
 * @Date: 2024-04-18 18:53:23
 * @FilePath: home.ts
 * @LastEditTime: 2024-04-19 20:34:56
 * @Description:
 */
// 引入 类型声明文件
import type { BannerItem, CategoryItem, HotPanelItem, GuessItem } from '@/types/home'
import type { PageParams, PageResult } from '@/types/global'

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
/**
 * 首页-热门推荐-小程序
 */
export const getHomeHotPanelAPI = () => {
  return http<HotPanelItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
/**
 * 猜你喜欢-小程序
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
