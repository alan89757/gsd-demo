const TOKEN_KEY = 'admin_token'
const USER_INFO_KEY = 'admin_user_info'
const PERMISSIONS_KEY = 'admin_permissions'

export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  role: string
  roleName: string
  createdAt: string
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserInfo(): User | null {
  const info = localStorage.getItem(USER_INFO_KEY)
  return info ? JSON.parse(info) : null
}

export function setUserInfo(user: User): void {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
}

export function removeUserInfo(): void {
  localStorage.removeItem(USER_INFO_KEY)
}

export function getPermissions(): string[] {
  const perms = localStorage.getItem(PERMISSIONS_KEY)
  return perms ? JSON.parse(perms) : []
}

export function setPermissions(permissions: string[]): void {
  localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(permissions))
}

export function clearAuth(): void {
  removeToken()
  removeUserInfo()
  localStorage.removeItem(PERMISSIONS_KEY)
}
