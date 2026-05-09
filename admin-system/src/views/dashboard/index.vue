<template>
  <div class="dashboard">
    <h1>仪表盘</h1>
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalUsers }}</div>
            <div class="stat-label">总用户数</div>
          </div>
          <el-icon class="stat-icon" color="#409EFF"><User /></el-icon>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalOrders }}</div>
            <div class="stat-label">总订单数</div>
          </div>
          <el-icon class="stat-icon" color="#67C23A"><ShoppingCart /></el-icon>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ stats.totalRevenue }}</div>
            <div class="stat-label">总收入</div>
          </div>
          <el-icon class="stat-icon" color="#E6A23C"><Money /></el-icon>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-value">{{ stats.todayVisits }}</div>
            <div class="stat-label">今日访问</div>
          </div>
          <el-icon class="stat-icon" color="#F56C6C"><View /></el-icon>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, ShoppingCart, Money, View } from '@element-plus/icons-vue'

const stats = ref({
  totalUsers: 1024,
  totalOrders: 5678,
  totalRevenue: '¥123,456',
  todayVisits: 2345
})
</script>

<style scoped lang="less">
.dashboard {
  h1 {
    margin-bottom: 20px;
    color: #303133;
  }
}

.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  position: relative;
  .stat-content {
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: #303133;
      margin-bottom: 8px;
    }
    .stat-label {
      font-size: 14px;
      color: #909399;
    }
  }
  .stat-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
  }
}
</style>
