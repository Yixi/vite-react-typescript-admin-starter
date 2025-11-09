# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 开发命令

- `yarn dev` - 启动开发服务器（端口 8800）
- `yarn build` - 构建生产版本
- `yarn test` - 运行 Jest 测试
- `yarn lint` - 运行 ESLint 检查
- `yarn typecheck` - 运行 TypeScript 类型检查
- `yarn prepare` - 设置 husky git hooks

## 组件库

- 'components/EmptyData' - 空状态组件
- 'components/Table' - 表格组件
- 'components/Panel' - 页面内容块组件
- 'components/FilterItem' - 表格上部过滤项组件

**优先使用components中封装的组件，如果没有需要的组件，默认使用antd组件**

## 代码库架构

**框架**: React 19 + TypeScript + Vite + React Router
**UI 组件库**: Ant Design
**状态管理**: jotai
**HTTP 客户端**: Axios-hooks
**样式**: Less CSS 带变量 + Ant Design 主题定制
**测试**: Jest + React Testing Library
**代码检查**: ESLint + TypeScript + Prettier

### 关键配置
- **Vite**: vite.config.ts 配置路径别名 `@root/` 指向 `src/`
- **TypeScript**: tsconfig.json 包含严格设置和路径映射
- **Jest**: jest.config.js 配置模块映射和资源模拟
- **ESLint**: eslint.config.js 包含 TypeScript、React 和 Prettier 规则

### 项目结构
```
docs/           # 项目文档
  xx/           # 模块名
    business.md  # 业务文档
    **.png       # 设计图
    api.md       # 接口文档
src/
  api/           # API 调用
  assets/       # 静态资源（图片、字体等）
  hooks/        # 自定义 React Hooks
  pages/        # 页面组件
  routes/       # React Router 路由
  store/        # 全局状态管理
  components/    # React 组件
  styles/        # Less 样式表
  shim/          # TypeScript 声明文件
  index.tsx      # 主应用入口
```

### 路径别名
使用 `@root/` 前缀从 `src/` 目录导入：
```typescript
import Component from '@root/components/Component'
```

### 代码风格
- 使用单引号，不加分号
- 2 空格缩进
- Prettier 自动格式化
- ESLint 强制执行代码质量规则
- 页面组件使用antd组件完成
- 页面组件按路由结构进行对应, 例如 /order/create 路由的页面应放在 /src/pages/order/create/index.tsx, react文件用到的测试和样式等应该放在同一文件目录下
- /src/components 下存放全局可复用组件
- 小范围模块的可复用组件可以放在对应页面目录下, 例如 /src/pages/order/components 下的组件可以提供给 /src/pages/order 下的其他页面使用
- doc 中文件按模块归纳的响应的业务描述和设计图api请求等内容
- 不用启动yarn dev，可以通过build来检查代码的正确性
