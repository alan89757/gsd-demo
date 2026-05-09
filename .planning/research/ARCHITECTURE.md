# Architecture Research

**Domain:** Vue后台管理系统
**Researched:** 2026-05-09
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        视图层 (Views)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Login   │  │Dashboard│  │ UserMgmt│  │ Settings│        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                      组件层 (Components)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Layout: AppLayout, Sidebar, Header, Breadcrumb     │    │
│  │  Common: TableList, FormModal, SearchBar, Pagination│    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                      状态层 (State/Pinia)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ useUser  │  │usePermiss│  │useGlobal │  │ useTheme  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      服务层 (Services)                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ auth API │  │ user API │  │ role API │  │ setting API│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Views | 页面级组件，组合业务逻辑 | 路由对应的页面组件 |
| Layout | 整体布局框架 | 侧边栏、顶部栏、内容区 |
| Common | 通用业务组件 | 表格、表单、弹窗等 |
| Pinia Stores | 状态管理 | 用户信息、权限、主题等 |
| Services | API调用封装 | Axios封装，统一错误处理 |

## Recommended Project Structure

```
src/
├── api/                    # API接口定义
│   ├── modules/           # 按模块划分
│   │   ├── auth.ts       # 认证相关API
│   │   ├── user.ts       # 用户管理API
│   │   └── role.ts       # 角色管理API
│   └── index.ts          # API统一导出
├── assets/                # 静态资源
│   ├── images/           # 图片资源
│   ├── styles/           # 全局样式
│   │   ├── variables.scss # SCSS变量
│   │   └── global.scss   # 全局样式
│   └── icons/            # SVG图标
├── components/            # 公共组件
│   ├── common/           # 通用组件
│   │   ├── TableList.vue
│   │   ├── FormModal.vue
│   │   ├── SearchBar.vue
│   │   └── Pagination.vue
│   ├── layout/           # 布局组件
│   │   ├── AppLayout.vue
│   │   ├── Sidebar.vue
│   │   ├── Header.vue
│   │   └── Breadcrumb.vue
│   └── icons/           # 图标组件
├── composables/          # 组合式函数
│   ├── useTable.ts       # 表格相关逻辑
│   ├── useForm.ts        # 表单相关逻辑
│   └── usePermission.ts  # 权限相关逻辑
├── layouts/              # 布局模板
│   ├── DefaultLayout.vue
│   └── BlankLayout.vue
├── router/                # 路由配置
│   ├── index.ts          # 路由实例
│   ├── routes.ts         # 路由定义
│   └── guards.ts         # 路由守卫
├── stores/                # Pinia状态库
│   ├── user.ts           # 用户状态
│   ├── permission.ts     # 权限状态
│   ├── global.ts         # 全局状态
│   └── theme.ts          # 主题状态
├── types/                 # TypeScript类型定义
│   ├── api.d.ts          # API响应类型
│   ├── user.d.ts         # 用户相关类型
│   └── router.d.ts       # 路由相关类型
├── utils/                 # 工具函数
│   ├── request.ts        # Axios封装
│   ├── storage.ts        # 本地存储
│   ├── validate.ts       # 表单验证
│   └── format.ts         # 格式化工具
├── views/                  # 页面组件
│   ├── login/            # 登录页
│   ├── dashboard/        # 仪表盘
│   ├── user/             # 用户管理
│   ├── role/             # 角色管理
│   └── settings/         # 系统设置
├── App.vue                # 根组件
├── main.ts                # 入口文件
└── env.d.ts              # 环境变量类型
```

### Structure Rationale

- **api/:** 统一管理所有API接口，便于维护和Mock
- **components/common/:** 抽取可复用业务组件，减少重复代码
- **composables/:** 组合式函数封装常用逻辑，Vue 3最佳实践
- **stores/:** Pinia状态管理，按功能模块划分
- **types/:** TypeScript类型定义，确保类型安全
- **utils/:** 工具函数，与业务逻辑解耦
- **views/:** 页面组件，一级目录按功能模块划分

## Architectural Patterns

### Pattern 1: 组合式函数 (Composables)

**What:** 将可复用的逻辑抽取到独立的函数中
**When to use:** 多个组件需要相同的逻辑时
**Trade-offs:** 需要一定学习成本，但大大提高复用性

**Example:**
```typescript
// composables/useTable.ts
export function useTable<T>(api: () => Promise<T[]>) {
  const data = ref<T[]>([])
  const loading = ref(false)
  const pagination = reactive({ page: 1, pageSize: 10, total: 0 })

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await api()
      data.value = res.data
      pagination.total = res.total
    } finally {
      loading.value = false
    }
  }

  return { data, loading, pagination, fetchData }
}
```

### Pattern 2: 权限指令 (Permission Directive)

**What:** 通过指令控制元素显示
**When to use:** 需要在模板中快速控制权限时
**Trade-offs:** 简单直接，但不宜过度使用

**Example:**
```typescript
// directives/permission.ts
export const permissionDirective = {
  mounted(el: HTMLElement, binding: any) {
    const { value } = binding
    const permissions = useUserStore().permissions
    if (value && !permissions.includes(value)) {
      el.parentNode?.removeChild(el)
    }
  }
}
```

### Pattern 3: API模块化封装

**What:** 按业务模块封装API调用
**When to use:** 所有API调用
**Trade-offs:** 结构清晰，但需要维护模块划分

**Example:**
```typescript
// api/modules/user.ts
export const userApi = {
  list: (params: UserQuery) => request.get('/users', { params }),
  detail: (id: string) => request.get(`/users/${id}`),
  create: (data: UserForm) => request.post('/users', data),
  update: (id: string, data: UserForm) => request.put(`/users/${id}`, data),
  delete: (id: string) => request.delete(`/users/${id}`)
}
```

## Data Flow

### Request Flow

```
[User Action]
    ↓
[View Component] → [Composable/Hook] → [API Service] → [Axios]
    ↓              ↓           ↓            ↓
[UI Update] ← [Transform] ← [Response] ← [Backend API]
```

### State Management

```
[Pinia Store]
    ↓ (subscribe)
[Components] ←→ [Actions] → [Getters] → [Store State]
```

### Key Data Flows

1. **登录流程:** LoginView → useAuth() → authApi.login() → userStore.setUser()
2. **权限验证:** Router Guard → permissionStore.hasPermission() → 允许/拒绝访问
3. **列表查询:** TableView → useTable() → listApi() → 更新data和pagination

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100用户 | 单体SPA足够，简化权限管理 |
| 100-1000用户 | 考虑添加请求缓存，优化列表加载 |
| 1000+用户 | 按需加载路由，虚拟滚动大数据列表 |

### Scaling Priorities

1. **First bottleneck:** 首屏加载慢 — 路由懒加载、组件按需引入
2. **Second bottleneck:** 列表查询慢 — 分页优化、后端分页

## Anti-Patterns

### Anti-Pattern 1: 在组件内直接调用API

**What people do:** 在每个组件内部写大量axios调用
**Why it's wrong:** 代码重复、难以维护、难以测试
**Do this instead:** 封装到api模块，通过composable调用

### Anti-Pattern 2: 全局状态滥用

**What people do:** 把所有数据都放到Pinia store
**Why it's wrong:** 不必要的数据同步开销，状态难以追踪
**Do this instead:** 组件内部用ref，只共享需要全局访问的状态

### Anti-Pattern 3: 权限硬编码

**What people do:** 在代码中直接写权限判断逻辑
**Why it's wrong:** 权限变更需要改代码，维护困难
**Do this instead:** 权限配置化，存储在后端动态获取

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| 后端REST API | Axios + RESTful | 统一错误处理、请求拦截 |
| 认证服务 | JWT Token | 本地存储，Axios请求头携带 |
| 图表服务 | ECharts | 按需引入，主题配置 |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| View ↔ Store | Pinia getter/action | 响应式数据绑定 |
| View ↔ API | Composable | 逻辑复用，数据转换 |
| Router ↔ Permission | Navigation Guard | 路由级别的权限控制 |

## Sources

- Vue 3 官方架构指南
- Pinia 状态管理模式
- Vue Element Admin 项目架构
- 主流Vue项目最佳实践

---
*Architecture research for: Vue后台管理系统*
*Researched: 2026-05-09*
