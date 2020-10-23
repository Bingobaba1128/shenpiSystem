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
    url: '/api/fuliaochukuribao',
    data: data,
    method: 'delete'
  })
}

export function deleteTuiHuoRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukureturnribao',
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
export function getPurchaseList() {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukuribao/getPurchaseNo?remark=qq&fuLiaoPurchaseNo=222',
    method: 'get'
  })
}
export function postData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukuribao',
    data: data,
    method: 'post'
  })
}
export function postNewData(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukureturnribao',
    data: data,
    method: 'post'
  })
}
export function postEditData1(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukureturnribao',
    data: data,
    method: 'put'
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
    url: '/api/fuliaochukuribao',
    data: data,
    method: 'put'
  })
}
export function getChuKuDetail(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
    method: 'get'
  })
}

export function loadSelectedDetails() {
  return request({
    baseURL: baseUrl,
    url: '/api/fuliaochukureturnribao/getTuiCangNo',
    method: 'get'
  })
}

export function getTuiHuoDetail(urlParam) {
  return request({
    baseURL: baseUrl,
    url: urlParam,
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
