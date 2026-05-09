import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { getToken } from './storage'
import router from '@/router'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const res = response.data
    
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    
    return res
  },
  async (error: AxiosError<any>) => {
    const status = error.response?.status
    const errorData = error.response?.data

    switch (status) {
      case 400:
        ElMessage.error(errorData?.message || '请求参数错误')
        break
      case 401:
        ElMessage.error('登录已过期，请重新登录')
        localStorage.clear()
        router.push('/login')
        break
      case 403:
        ElMessage.error('没有访问权限')
        break
      case 404:
        ElMessage.error('请求的资源不存在')
        break
      case 500:
        ElMessage.error('服务器错误，请稍后重试')
        break
      default:
        ElMessage.error(errorData?.message || '网络错误，请检查网络连接')
    }

    return Promise.reject(error)
  }
)

export const request = {
  get: (url: string, params?: any, config?: AxiosRequestConfig) => {
    return service.get<any>(url, { params, ...config })
  },
  
  post: (url: string, data?: any, config?: AxiosRequestConfig) => {
    return service.post<any>(url, data, config)
  },
  
  put: (url: string, data?: any, config?: AxiosRequestConfig) => {
    return service.put<any>(url, data, config)
  },
  
  delete: (url: string, params?: any, config?: AxiosRequestConfig) => {
    return service.delete<any>(url, { params, ...config })
  }
}

export default service
