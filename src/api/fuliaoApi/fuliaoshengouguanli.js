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
    url: '/api/fulLaoPurchaseApplication',
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

export function loadFuLiaoName() {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaojichu',
    method: 'get'
  })
}
export function postData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fulLaoPurchaseApplication',
    data: data,
    method: 'post'
  })
}

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
    url: '/api/fulLaoPurchaseApplication',
    data: data,
    method: 'put'
  })
}

export function searchInventoryData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}
