import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getToken, setToken, getUserInfo, setUserInfo, clearAuth, type User } from '@/utils/storage'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(getToken() || '')
  const userInfo = ref<User | null>(getUserInfo())

  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')
  const userId = computed(() => userInfo.value?.id || '')

  function setUserToken(newToken: string) {
    token.value = newToken
    setToken(newToken)
  }

  function setUserInfoAction(info: User) {
    userInfo.value = info
    setUserInfo(info)
  }

  async function login(form: { username: string; password: string }) {
    const mockResponse = {
      token: 'mock_token_' + Date.now(),
      user: {
        id: '1',
        username: form.username,
        email: form.username + '@example.com',
        role: 'admin',
        roleName: '管理员',
        createdAt: new Date().toISOString()
      }
    }
    setUserToken(mockResponse.token)
    setUserInfoAction(mockResponse.user)
    return mockResponse
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    clearAuth()
    const permissionStore = usePermissionStore()
    permissionStore.clearPermissions()
  }

  function resetToken() {
    logout()
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    username,
    userId,
    setUserToken,
    setUserInfoAction,
    login,
    logout,
    resetToken
  }
})
