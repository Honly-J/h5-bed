const axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
const get = function (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(
      url,
      { params }
    ).then(res => {
      resolve(res)
    }).catch(e => {
      console.error(e)
      reject(e)
    })
  })
}

const post = function (url, data = {}) {
  return new Promise((resolve, reject) => {
    console.log('post请求：', url, data)
    axios.post(url, data).then(res => {
      resolve(res)
    }).catch(e => {
      console.error(e)
      reject(e)
    })
  })
}

export { get, post }
