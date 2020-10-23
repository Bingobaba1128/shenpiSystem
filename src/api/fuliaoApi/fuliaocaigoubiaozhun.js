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
    url: '/api/fuliaocaigoubiaozhun',
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

export function postData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaocaigoubiaozhun',
    data: data,
    method: 'post'
  })
}

export function editData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaocaigoubiaozhun',
    data: data,
    method: 'put'
  })
}
