// @ts-check

import eslint from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import { fixupPluginRules } from '@eslint/compat'

// eslint-plugin-react 还未适配 ESLint 10（仍调用已移除的 context.getFilename 等
// 旧 API），用官方 @eslint/compat 包裹恢复旧 API，等其原生支持 v10 后可移除
const reactPluginFixed = fixupPluginRules(reactPlugin)

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ...reactPlugin.configs.flat.recommended,
    plugins: { react: reactPluginFixed },
  },
  {
    rules: {
      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      // indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'react/prop-types': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
)
