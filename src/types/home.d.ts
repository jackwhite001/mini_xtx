// /** 首页-广告区域数据类型 */

export type BannerItem = {
  // 跳转连接
  hrefUrl: String
  // id
  id: string
  // 图片链接
  imgUrl: string
  // 跳转类型
  type: number
}

/**
 *
 * @description: 首页 前台分类数据类型
 */
export type CategoryItem = {
  // id
  id: string
  // icon name
  name: string
  // icon url address
  icon: string
  // 跳转类型
  type: number
}
