import js from '@eslint/js';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';

export default [
  // Configuração base do JavaScript
  js.configs.recommended,

  // Configuração para arquivos TypeScript/React
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        React: 'readonly',
      },
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      // ✅ 1. Proibir any (com warn)
      '@typescript-eslint/no-explicit-any': 'warn',

      // 🧼 2. Ordenar automaticamente os imports
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // 🧩 3. Evitar variáveis não utilizadas
      'no-unused-vars': 'off', // desativa regra do ESLint padrão
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // ✨ 4. Forçar uso de const quando variável não muda
      'prefer-const': 'warn',

      // 👻 5. Proibir funções vazias
      '@typescript-eslint/no-empty-function': 'warn',

      // 🔁 6. Evitar reatribuição de parâmetros
      'no-param-reassign': 'warn',

      // 📦 7. Evitar default export (padrão da comunidade React moderna)
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'warn',

      // 🚫 8. Proibir console.log (permitir console.error ou warn)
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 👮‍♂️ 9. Forçar uso de Hooks corretamente
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 📄 10. React – Forçar extensão .tsx apenas quando necessário
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],

      // Regras adicionais do TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',

      // Regras do React
      'react/react-in-jsx-scope': 'off', // Não necessário no React 17+
      'react/prop-types': 'off', // Usando TypeScript
      'react/jsx-uses-react': 'off', // Não necessário no React 17+
      'react/jsx-uses-vars': 'warn',

      // Regras gerais
      'no-undef': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },

  // Configuração para arquivos JavaScript
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },

  // Arquivos a serem ignorados
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
];
