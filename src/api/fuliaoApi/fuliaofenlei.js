import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function loadData(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}

export function saveNewForm(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaoleixing',
    data: data,
    method: 'post'
  })
}

export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaoleixing',
    data: data,
    method: 'delete'
  })
}

export function editRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaoleixing',
    data: data,
    method: 'put'
  })
}

export function searchData(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}
