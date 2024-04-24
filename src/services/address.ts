import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'

/**
 * @param [ AddressParams ] data
 * @description: 新增地址 请求
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

/**
 * @description: 获取收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

/**
 * @param [ string ] id 地址id（路径参数）
 * @description: 获取收货地址详情
 */
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

/**
 * @param [ string ] id  地址id（路径参数）
 * @param [ AddressItem ] data 表单参数（请求体参数）
 * @description: 修改收货地址接口
 */
export const putMemberAddressByIdAPI = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
/**
 * @param [ string ] id  地址id（路径参数）
 * @description: 通过id删除收货地址接口
 */
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
