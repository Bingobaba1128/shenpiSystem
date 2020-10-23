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
    url: '/api/Apply?',
    data: paramData,
    method: 'post'
  })
}

export function postData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/Apply?',
    data: paramData,
    method: 'put'
  })
}
export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/Apply',
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

export function loadKeHuList(data) {
  return request({
    baseURL: baseUrl,
    url: data,
    method: 'get'
  })
}

export function loadYwDept(urlP) {
  return request({
    baseURL: 'http://120.78.186.60:8095',
    url: urlP,
    method: 'get'
  })
}

export function loadYeWuPerson(urlP) {
  return request({
    baseURL: 'http://120.78.186.60:8095',
    url: urlP,
    method: 'post'
  })
}
export function uploadData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/Approve?',
    data: paramData,
    method: 'post'
  })
}
export function passData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/Approve?',
    data: paramData,
    method: 'put'
  })
}
