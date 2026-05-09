# Phase 1: 项目基础架构搭建 - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

为 Vue 后台管理系统搭建技术基础设施，包括项目初始化、目录结构、路由系统、状态管理、认证系统和 API 封装。这一阶段是所有后续功能开发的基础，必须建立清晰的技术规范和开发模式。

</domain>

<decisions>
## Implementation Decisions

### Token 存储策略
- **D-01:** Token 存储在 localStorage 中，便于跨标签页共享和状态管理
- **D-02:** Token 通过 Authorization header 传递，配合短期过期时间（2小时）平衡安全性

### 权限模型设计
- **D-03:** 采用动态权限模型，权限数据从后端 API 获取
- **D-04:** Phase 1 只实现权限基础框架（路由守卫、权限存储），权限数据可先模拟
- **D-05:** Phase 2 完善权限分配功能

### 路由加载策略
- **D-06:** 采用混合路由加载策略
- **D-07:** 核心页面预加载：主布局、仪表盘
- **D-08:** 其他页面懒加载：用户管理、角色管理等

### API 基础配置
- **D-09:** 使用 .env 文件配置 API 地址
- **D-10:** 支持多环境：.env.development（开发）、.env.production（生产）

### Claude's Discretion
以下未明确指定的实现细节，由规划阶段决定：
- 具体目录结构细节
- Axios 拦截器的具体实现
- Pinia store 的具体模块划分
- 路由守卫的具体实现逻辑

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — 项目定义和技术栈约束
- `.planning/REQUIREMENTS.md` — Phase 1 对应的 9 个需求（AUTH-01~05, PERM-01, 02, 04）

### Research Findings
- `.planning/research/STACK.md` — Vue 3 技术栈推荐和版本要求
- `.planning/research/ARCHITECTURE.md` — 项目结构和分层架构设计
- `.planning/research/PITFALLS.md` — 需要避免的常见问题

### Roadmap
- `.planning/ROADMAP.md` — Phase 1 的完整目标、需求和成功标准

</canonical_refs>

<codebase_context>
## Existing Code Insights

### Reusable Assets
- **无** — 这是第一个阶段，代码库为空，所有代码都需要从零创建

### Established Patterns
- **无** — 新项目无现有模式，需建立标准

### Integration Points
- **无** — Phase 1 是基础设施，后续阶段会在此基础上开发

</codebase_context>

<specifics>
## Specific Ideas

- Token 存储实现位置：`src/utils/storage.ts`（使用 localStorage 封装）
- API 配置使用 Vite 原生 `.env` 支持
- 路由使用 Vue Router 4.x 的动态导入实现懒加载
- 权限存储在 Pinia store 中，全局可访问

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 1-项目基础架构搭建*
*Context gathered: 2026-05-09*
