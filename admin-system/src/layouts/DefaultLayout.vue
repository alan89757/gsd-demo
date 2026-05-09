<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="sidebar">
      <div class="logo">
        <h1>后台管理系统</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><DataAnalysis /></el-icon>
          <span>仪表盘</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <span class="page-title">{{ pageTitle }}</span>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-icon><User /></el-icon>
              <span>{{ username }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataAnalysis, User, ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const username = computed(() => userStore.username || 'Admin')
const activeMenu = computed(() => route.path)
const pageTitle = computed(() => (route.meta.title as string) || '首页')

const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped lang="less">
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      color: #fff;
      font-size: 18px;
      margin: 0;
    }
  }
  .sidebar-menu {
    border-right: none;
    background-color: #304156;
  }
}

.header {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title {
    font-size: 16px;
    font-weight: 500;
  }
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin: 0 4px;
    }
  }
}

.content {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
