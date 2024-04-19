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
}
/** 首页-热门推荐数据类型 */

export type HotPanelItem = {
  // id
  id: string
  // pictures type array
  /** 图片集合[ 图片路径 ] */
  pictures: string[]
  // title string
  title: string
  // alt img explain
  alt: string
  // target
  target: string
  type: number
}

/** 猜你喜欢-商品类型 */
export type GuessItem = {
  /** 商品描述 */
  desc: string
  /** 商品折扣 */
  discount: number
  /** id */
  id: string
  /** 商品名称 */
  name: string
  /** 商品已下单数量 */
  orderNum: number
  /** 商品图片 */
  picture: string
  /** 商品价格 */
  price: string
}
