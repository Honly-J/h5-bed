const Mock = require('mockjs')
// 提交
Mock.mock('/sub', 'post', () => {
  return {
    'status': '0',
    'data': '3x12tw'
  }
})
