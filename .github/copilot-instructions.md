# GitHub Copilot 项目指导

本文件为 GitHub Copilot 提供此代码库的开发指导和最佳实践。

## 技术栈

- **框架**: React 19 + TypeScript + Vite + React Router
- **UI 组件库**: Ant Design
- **状态管理**: jotai
- **HTTP 客户端**: Axios-hooks
- **样式**: Less CSS + Ant Design 主题定制
- **测试**: Jest + React Testing Library
- **代码检查**: ESLint + TypeScript + Prettier

## 开发命令

```bash
yarn dev        # 启动开发服务器（端口 8800）
yarn build      # 构建生产版本
yarn test       # 运行 Jest 测试
yarn lint       # 运行 ESLint 检查
yarn typecheck  # 运行 TypeScript 类型检查
```

## 项目结构约定

### 目录结构

```
docs/              # 项目文档，按模块组织
  [module]/        # 模块名
    business.md    # 业务文档
    **.png         # 设计图
    api.md         # 接口文档
src/
  api/             # API 调用
  assets/          # 静态资源（图片、字体等）
  hooks/           # 自定义 React Hooks
  pages/           # 页面组件
  routes/          # React Router 路由配置
  store/           # 全局状态管理
  components/      # 全局可复用组件
  styles/          # Less 样式表
  shim/            # TypeScript 声明文件
  index.tsx        # 主应用入口
```

### 组件组织规则

1. **页面组件位置**: 页面组件应按路由结构组织
   - 例如: `/order/create` 路由 → `/src/pages/order/create/index.tsx`
   - 相关的测试、样式文件应放在同一目录下

2. **组件复用层级**:
   - **全局组件**: `/src/components` - 存放全局可复用组件
   - **模块组件**: `/src/pages/[module]/components` - 该模块内复用的组件
   - 例如: `/src/pages/order/components` 下的组件可供 `/src/pages/order` 下的所有页面使用

3. **优先使用封装组件**: 优先使用 `components/` 中封装的组件，如果没有所需组件，则使用 Ant Design 组件
   - `components/EmptyData` - 空状态组件
   - `components/Table` - 表格组件
   - `components/Panel` - 页面内容块组件
   - `components/FilterItem` - 表格上部过滤项组件

## 代码风格规范

### 格式化规则

- 使用单引号（`'`）而非双引号
- 不使用分号（`;`）
- 2 空格缩进
- Prettier 自动格式化
- ESLint 强制执行代码质量规则

### 导入路径

使用 `@root/` 路径别名从 `src/` 目录导入：

```typescript
// ✅ 推荐
import Component from '@root/components/Component'
import { useCustomHook } from '@root/hooks/useCustomHook'

// ❌ 避免
import Component from '../../components/Component'
```

### TypeScript 使用

- 严格的 TypeScript 配置
- 为组件、函数、变量提供明确的类型定义
- 避免使用 `any` 类型
- 利用类型推断，但在必要时提供显式类型

### React 组件编写

```typescript
// ✅ 推荐的组件结构
import React from 'react'
import { Button, Space } from 'antd'
import styles from './index.module.less'

interface Props {
  title: string
  onSubmit: () => void
}

const MyComponent: React.FC<Props> = ({ title, onSubmit }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button onClick={onSubmit}>提交</Button>
    </div>
  )
}

export default MyComponent
```

## 开发最佳实践

### 状态管理

- 使用 jotai 进行全局状态管理
- 组件本地状态使用 React useState/useReducer
- 存储文件放在 `src/store/` 目录

### API 调用

- 使用 axios-hooks 进行 HTTP 请求
- API 函数定义在 `src/api/` 目录
- 处理加载、错误和成功状态

### 样式编写

- 使用 Less CSS 模块
- 样式文件与组件文件放在同一目录
- 利用 Ant Design 主题变量（`src/styles/variable.less`）
- 避免内联样式，除非必要

### 测试

- 为关键组件和功能编写测试
- 使用 Jest + React Testing Library
- 测试文件命名: `*.test.ts` 或 `*.test.tsx`
- 测试文件与被测试文件放在同一目录

## 验证代码

- **不要使用 `yarn dev` 启动开发服务器**
- **使用 `yarn build` 检查代码正确性**
- 提交前运行 `yarn lint` 和 `yarn typecheck`
- Git hooks (husky) 会自动执行检查

## 配置文件说明

- `vite.config.ts` - Vite 配置，包含路径别名 `@root/`
- `tsconfig.json` - TypeScript 配置，严格模式和路径映射
- `jest.config.js` - Jest 测试配置
- `eslint.config.js` - ESLint 规则配置
- `postcss.config.js` - PostCSS 配置

## 常见模式

### 创建新页面

1. 在 `src/pages/` 下按路由结构创建目录
2. 创建 `index.tsx` 主组件文件
3. 如需样式，创建 `index.module.less` 或 `index.less`
4. 在 `src/routes/index.tsx` 中配置路由
5. 在 `docs/` 对应模块下添加业务文档

### 创建新组件

1. 判断组件复用范围
   - 全局复用 → `src/components/`
   - 模块内复用 → `src/pages/[module]/components/`
2. 创建组件目录和文件
3. 编写组件、类型定义、样式
4. 导出组件

### API 集成

1. 在 `src/api/` 创建对应模块的 API 文件
2. 使用 axios-hooks 定义请求函数
3. 在组件中导入并使用
4. 在 `docs/[module]/api.md` 中记录接口文档

## 注意事项

- 始终使用 TypeScript，不要使用 JavaScript
- 优先使用函数组件和 Hooks
- 遵循 React 最佳实践和性能优化
- 保持组件小而专注
- 编写自文档化的代码，必要时添加注释
- 确保所有导入路径正确且使用路径别名
