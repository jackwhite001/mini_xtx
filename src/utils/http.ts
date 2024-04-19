import { useMemberStore } from './../stores/modules/member'
/**
 * 添加拦截器：
 * 拦截request请求
 * 拦截uploadFile文件上传
 *
 * TOD0:
 * 1.非http开头需拼接地址
 * 2.请求超时
 * 3.添加小程序端请求头标识
 * 4.添加token请求头标识
 *
 */

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const HttpInterceptor = {
  // 拦截器触发
  invoke(options: UniApp.RequestOptions) {
    //1、 非http开头需拼接地址startsWith 方法 返回boolean值
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //2、 超时时间 默认 ms
    options.timeout = 10000
    // 3、添加小程序段 请求标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    // 4、添加token 请求标识
    // 需要先从store中拿到用户的登录信息
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
uni.addInterceptor('request', HttpInterceptor)
uni.addInterceptor('uploadFile', HttpInterceptor)

/**
 * @param UniApp.RequestOptions
 * @returns Promise
 * 1.·返回·Promise·对象I
 * 2.请求成功
 *  2.1提取核心数据res.data
 *  2.2添加类型，支持泛型
 * 3.请求失败
 *  3.1网络错误->提示用户换网络
 *  3.2401错误->清理用户信息，跳转到登录页
 *  3.3其他错误->根据后端错误信息轻提示
 */
// 添加接口泛型
interface Data<T> {
  msg: string
  code: String
  result: T
}
// 添加类型 支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 1、返回 promise 对象
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 2、请求成功
      success(res) {
        // 判断状态码
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 取核心数据res.data
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          // 2.2401清理用户信息，跳转到登录页
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res.data as Data<T>)
        } else {
          // 3.其他错误->根据后端错误信息轻提示
          uni.showToast({
            title: (res.data as Data<T>).msg || '请求错误',
            icon: 'none',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        console.log('error', err)
        uni.showToast({
          title: '网络错误，换个网络试试',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}
