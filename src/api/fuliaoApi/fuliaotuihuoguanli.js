import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoPurchaseReturn',
    data: data,
    method: 'delete'
  })
}

export function searchData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function getData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}
// export function loadFuLiaoLeiXingData() {
//   return request({
//     baseURL: baseUrl,
//     url: '/api/fuliaoleixing',
//     method: 'get'
//   })
// }
export function getPurchaseList() {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoPurchaseReturn/getReturnRiBao?style=采购单号',
    method: 'get'
  })
}
export function postData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoPurchaseReturn',
    data: data,
    method: 'post'
  })
}
// export function postEditData(data) {
//   return request({
//     baseURL: baseUrl,
//     url: '/api/fuLiaoPurchase',
//     data: data,
//     method: 'put'
//   })
// }
export function getSelected(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}
export function postEditData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoPurchaseReturn',
    data: data,
    method: 'put'
  })
}
