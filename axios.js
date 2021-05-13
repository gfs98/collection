import axios from 'axios'
import {
  message
} from 'ant-design-vue'
import { userStorage } from './cache.js';
import router from "@/router";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  interceptors(instance) {
    // 响应拦截
    instance.interceptors.response.use(res => {
      const {
        data,
        status
      } = res
      return {
        data,
        status
      }
    }, error => {
      let _error = JSON.parse(JSON.stringify(error))
      let msg = _error.message
      message.error(msg)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    //   options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
// let baseUrl = 'http://192.168.2.204:9999'
let Api = new HttpRequest()
export const api = (url = '', data = {}, config = {}) => {
  //   console.log(config)
  // 初始化额外参数
  let {
    method = 'post', responseType = 'json', showMsg = false
  } = config

  // 处理发送的数据
  if (url.indexOf("?") != -1) {
    url = url + "&t=" + new Date().getTime()
  } else {
    url = url + "?t=" + new Date().getTime()
  }
  let _data = JSON.stringify(data)


  // 返回ajax方法
  return Api.request({
    url,
    data: _data,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    method: method,
    responseType: responseType
  }).then(res => {
    // 处理登录超时
    // console.log(res)
    // if (res.data && res.data.code == '900') {
    //   userStorage.remove()
    //   message.error(res.data.msg)
    //   setTimeout(() => {
    //     router.replace({
    //       path: '/login'
    //     });
    //   }, 1000)
    //   return false
    // }else if (res.data && res.data.code == '500'){
    //   message.error(res.data.msg)
    // }else if(showMsg){
    //   message.success(res.data.msg ? res.data.msg : '操作成功！')
    // }
    if (res.data && res.data.code == '500'){
      message.error(res.data.msg)
      return false
    }else{
      return res
    }
    
  })
}
export const Get = (url, data) => {
  return new Promise((resolve, reject) => {
    api(url, data, { method: 'get' })
      .then(res => {
        if(res){resolve(res.data)}
      }).catch(err => {
        reject(err)
      })
  })
}
export const Post = (url, data) => {
  return new Promise((resolve, reject) => {
    api(url, data)
      .then(res => {
        if(res){resolve(res.data)}
      }).catch(err => {
        reject(err)
      })
  })
}
export const Put = (url, data) => {
  return new Promise((resolve, reject) => {
    api(url, data, { method: 'put' })
      .then(res => {
        if(res){resolve(res.data)}
      }).catch(err => {
        reject(err)
      })
  })
}
export const Delete = (url, data) => {
  return new Promise((resolve, reject) => {
    api(url, data, { method: 'delete' })
      .then(res => {
        if(res){resolve(res.data)}
      }).catch(err => {
        reject(err)
      })
  })
}
// export default api