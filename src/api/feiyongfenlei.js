import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function addData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/FeeClassifaction?',
    data: paramData,
    method: 'post'
  })
}

export function postData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/FeeClassifaction?',
    data: paramData,
    method: 'put'
  })
}
export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/FeeClassifaction',
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
