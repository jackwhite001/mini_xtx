import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type loginParams = {
  code: string
  encryptedData: string
  iv: string
}

/**
 * @param [ loginParams ] data 请求参数
 * @description: 小程序登录
 */
export const postLoginWxMinAPI = (data: loginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * @param [ string ] phoneNumber 模拟手机号
 * @description: 小程序登录_内测版
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
