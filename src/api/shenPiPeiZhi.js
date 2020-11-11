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
    url: '/api/ApproveSystem?',
    data: paramData,
    method: 'post'
  })
}

export function postData(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/ApproveSystem?',
    data: paramData,
    method: 'put'
  })
}
export function deleteRecord(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/ApproveSystem',
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

export function loadDept(data) {
  return request({
    baseURL: 'http://120.78.186.60:8095',
    url: data,
    method: 'get'
  })
}
export function loadPerson(data) {
  return request({
    baseURL: 'http://120.78.186.60:8095',
    url: data,
    method: 'post'
  })
}
export function addDataConfig(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/ApproveConfig?',
    data: paramData,
    method: 'post'
  })
}
export function postDataConfig(paramData) {
  return request({
    baseURL: baseUrl,
    url: '/api/ApproveConfig?',
    data: paramData,
    method: 'put'
  })
}
export function deleteRecordConfig(data) {
  return request({
    baseURL: baseUrl,
    url: '/api/ApproveConfig',
    data: data,
    method: 'delete'
  })
}