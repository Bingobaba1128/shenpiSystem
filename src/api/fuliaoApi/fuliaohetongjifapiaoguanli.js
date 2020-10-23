import request from '@/utils/request'
import { baseUrl } from '@/api/apiUrl'

export function getAllData(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    // params: { data },
    method: 'get'
  })
}

export function loadFuLiaoData(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}

export function searchResult(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function deleteData(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'delete'
  })
}

export function addRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/FuliaoContractFP',
    data: data,
    method: 'post'
  })
}

export function addEditRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/FuliaoContractFP',
    data: data,
    method: 'put'
  })
}

export function addChuanWuRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/addChuanWu',
    data: data,
    method: 'post'
  })
}
