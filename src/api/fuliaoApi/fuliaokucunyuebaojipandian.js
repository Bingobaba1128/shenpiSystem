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
    url: '/api/fuLiaoPurchase',
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

export function loadFuLiaoLeiXingData() {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaoleixing',
    method: 'get'
  })
}
export function getSelected(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}
export function postData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoStorageCheck',
    data: data,
    method: 'post'
  })
}
export function postEditData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuLiaoPurchase',
    data: data,
    method: 'put'
  })
}
