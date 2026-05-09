import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPermissions, setPermissions } from '@/utils/storage'

export const usePermissionStore = defineStore('permission', () => {
  const permissions = ref<string[]>(getPermissions())
  const routes = ref<any[]>([])

  function setPermissionsAction(perms: string[]) {
    permissions.value = perms
    setPermissions(perms)
  }

  function setRoutes(newRoutes: any[]) {
    routes.value = newRoutes
  }

  function hasPermission(permission: string | string[]): boolean {
    if (Array.isArray(permission)) {
      return permission.some(p => permissions.value.includes(p))
    }
    return permissions.value.includes(permission)
  }

  function clearPermissions() {
    permissions.value = []
    routes.value = []
    setPermissions([])
  }

  return {
    permissions,
    routes,
    setPermissionsAction,
    setRoutes,
    hasPermission,
    clearPermissions
  }
})
