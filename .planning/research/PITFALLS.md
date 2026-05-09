# Pitfalls Research

**Domain:** Vue后台管理系统
**Researched:** 2026-05-09
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: 权限控制不完整

**What goes wrong:**
用户可以访问不该访问的页面或操作未授权的功能，数据安全隐患。

**Why it happens:**
只做了前端路由层面的权限控制，但API层面没有校验，导致可以直接调用API操作数据。

**How to avoid:**
1. 前端：路由守卫 + 按钮级别权限指令
2. 后端：每个API接口都要校验用户权限
3. 前后端双重验证

**Warning signs:**
- 用户A能看到用户B的数据
- 普通用户能执行管理员操作
- 刷新页面后权限状态异常

**Phase to address:**
Phase 1 - 认证与权限体系

---

### Pitfall 2: 表单验证不一致

**What goes wrong:**
前端验证规则与后端不一致，导致用户体验差或数据格式混乱。

**Why it happens:**
前后端各自维护验证逻辑，修改时容易遗漏一方。

**How to avoid:**
1. 定义统一的验证规则配置
2. 考虑使用zod/yup等schema定义
3. 后端验证规则可以返回给前端复用

**Warning signs:**
- 用户填写表单时报错与后端不一致
- 同样的验证规则在不同表单表现不同

**Phase to address:**
Phase 2 - 用户与角色管理

---

### Pitfall 3: 未处理的空状态

**What goes wrong:**
API返回空数据时页面显示异常或直接崩溃。

**Why it happens:**
没有考虑数据为空的各种场景（null, undefined, [], {}）。

**How to avoid:**
1. 使用可选链操作符 (?.)
2. 提供空状态UI（空列表、无数据提示）
3. 设置合理的默认值

**Warning signs:**
- 控制台报错 "Cannot read property of null"
- 页面加载后显示空白
- 某些数据消失导致布局错乱

**Phase to address:**
Phase 2 - 用户与角色管理

---

### Pitfall 4: 状态管理混乱

**What goes wrong:**
数据分散在多个地方，来源不清，同步困难，调试困难。

**Why it happens:**
滥用全局状态，把本该是局部状态的数据放到store。

**How to avoid:**
1. 组件内部用ref/computed，只有需要共享的才用store
2. 明确状态所有权（谁拥有，谁修改）
3. 使用devtools追踪状态变化

**Warning signs:**
- store中有大量看似不需要全局的状态
- 修改数据后不知道哪个组件会响应
- 状态来源难以追踪

**Phase to address:**
Phase 1 - 项目基础架构搭建

---

### Pitfall 5: 路由懒加载配置不当

**What goes wrong:**
首屏加载过慢，或者打包后单个chunk过大。

**Why it happens:**
没有合理拆分路由，或者过度懒加载导致请求碎片化。

**How to avoid:**
1. 核心路由直接加载，非核心路由懒加载
2. 组件库按需引入
3. 合理设置路由分块策略

**Warning signs:**
- 首屏加载超过3秒
- 控制台警告路由 chunk过大
- Lighthouse性能分数低于80

**Phase to address:**
Phase 1 - 项目基础架构搭建

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| any类型滥用 | 快速通过类型检查 | 类型安全失效 | never |
| 硬编码Magic Number | 不用定义常量 | 难以理解和修改 | never |
| 复制粘贴代码 | 快速实现功能 | 维护成本倍增 | never |
| 跳过单元测试 | 加快开发速度 | 回归风险增加 | MVP阶段可接受 |
| 忽略错误处理 | 代码更简洁 | 系统不稳定 | never |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Axios请求 | 不处理错误，统一catch | 每个API都要try-catch，区分业务错误和系统错误 |
| Token刷新 | 只在请求失败后刷新 | 应该在token快过期时主动刷新 |
| 文件上传 | 大文件一次性读取 | 分片上传，显示进度 |
| 第三方SDK | 在组件内直接实例化 | 在composable或plugin中统一初始化 |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| 大列表不虚拟滚动 | 列表超过1000条时卡顿 | 使用虚拟滚动组件 | 列表超过500条 |
| 重复计算不缓存 | 每次渲染都重新计算 | 使用computed或memo | 有复杂计算逻辑时 |
| 过多watcher | 数据变化时响应慢 | 合并多个watch，使用computed | 有多个相关状态时 |
| 图片未压缩 | 页面加载慢 | 图片压缩，使用CDN | 有大量图片上传时 |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Token明文存储 | XSS攻击获取token | 使用httpOnly cookie或加密存储 |
| 敏感信息本地明文 | 本地存储泄露 | 敏感信息不存本地，存内存 |
| 权限前端只验证 | API可被直接调用 | 后端必须验证权限 |
| 未限制请求频率 | DDoS攻击 | 后端实现请求限流 |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| 删除前无确认 | 误操作数据丢失 | 所有删除操作加二次确认 |
| 表单提交无反馈 | 不知道操作是否成功 | 显示loading状态和成功/失败提示 |
| 页面跳转无过渡 | 操作感觉很突兀 | 添加页面切换动画 |
| 表单验证时机不对 | 还没输入完就报错 | blur时验证，提交时再全面验证 |
| 加载状态不友好 | 等待时无反馈 | 显示骨架屏或loading动画 |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **用户登录:** Often missing登录失败处理和错误提示 — verify错误提示清晰
- [ ] **权限控制:** Often missing按钮级别的权限控制 — verify未授权按钮不可见
- [ ] **表单验证:** Often missing后端返回错误与前端联动 — verify后端错误能正确显示
- [ ] **列表分页:** Often missing总数显示和跳转功能 — verify用户能知道总数和快速跳转
- [ ] **删除操作:** Often missing删除成功后的状态更新 — verify列表自动刷新
- [ ] **错误处理:** Often missing网络错误的友好提示 — verify断网时提示清晰

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| 权限漏洞 | HIGH | 立即审计日志，修复API权限，回滚问题代码 |
| 数据丢失 | HIGH | 从备份恢复，建立数据审核机制 |
| 性能问题 | MEDIUM | 添加性能监控，逐步优化关键路径 |
| XSS攻击 | HIGH | 清理用户输入，升级依赖版本 |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| 权限控制不完整 | Phase 1 | 手动测试各角色权限 |
| 表单验证不一致 | Phase 2 | 对比前后端验证规则 |
| 未处理的空状态 | Phase 2 | 模拟各种空数据场景 |
| 状态管理混乱 | Phase 1 | 代码review检查store使用 |
| 路由懒加载配置不当 | Phase 1 | Lighthouse性能测试 |

## Sources

- Vue官方最佳实践文档
- Element Plus组件使用建议
- Web安全最佳实践（OWASP）
- 前端性能优化指南

---
*Pitfalls research for: Vue后台管理系统*
*Researched: 2026-05-09*
