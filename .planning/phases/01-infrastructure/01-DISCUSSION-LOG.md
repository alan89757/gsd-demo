# Phase 1: 项目基础架构搭建 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-09
**Phase:** 1-项目基础架构搭建
**Areas discussed:** Token存储策略, 权限模型设计, 路由加载策略, API配置方式

---

## Token存储策略

| Option | Description | Selected |
|--------|-------------|----------|
| localStorage | 简单易用，跨标签页共享，便于调试。配合短期 Token 过期时间 | ✓ |
| sessionStorage | 标签页关闭即清除，安全性更好，但不支持跨标签页 | |
| httpOnly Cookie | 安全性最高，但需要后端配合，不便于前端调试 | |

**User's choice:** localStorage（推荐）
**Notes:** 简单易用，跨标签页共享，便于调试。配合短期 Token 过期时间平衡安全性。

---

## 权限模型设计

| Option | Description | Selected |
|--------|-------------|----------|
| 动态权限（推荐） | 权限从后端获取，灵活可调整。Phase 1 只做框架，权限数据模拟 | ✓ |
| 静态权限 | 权限写死在代码中，简单但不够灵活。适合权限固定的场景 | |
| 混合模式 | 基础权限硬编码，高级权限动态配置 | |

**User's choice:** 动态权限（推荐）
**Notes:** 权限从后端获取，灵活可调整。Phase 1 只做框架，权限数据模拟。

---

## 路由加载策略

| Option | Description | Selected |
|--------|-------------|----------|
| 混合策略（推荐） | 核心页面预加载（布局、仪表盘），其他懒加载，平衡体验 | ✓ |
| 全量懒加载 | 所有路由懒加载，首屏最快，但切换页面有短暂延迟 | |
| 全量预加载 | 所有页面预加载，首次访问快，但首屏加载慢 | |

**User's choice:** 混合策略（推荐）
**Notes:** 核心页面预加载（布局、仪表盘），其他懒加载，平衡体验。

---

## API配置方式

| Option | Description | Selected |
|--------|-------------|----------|
| .env 文件（推荐） | Vite 原生支持，.env.development/production 切换方便 | ✓ |
| 运行时配置 | 通过 window.APP_CONFIG 或配置文件动态加载 | |
| 配置文件 | 创建 src/config/api.ts 配置文件集中管理 | |

**User's choice:** .env 文件（推荐）
**Notes:** Vite 原生支持，.env.development/production 切换方便。

---

## Claude's Discretion

以下实现细节由规划阶段决定：
- 具体目录结构细节
- Axios 拦截器的具体实现
- Pinia store 的具体模块划分
- 路由守卫的具体实现逻辑

## Deferred Ideas

无 — 所有讨论都在 Phase 1 范围内。

