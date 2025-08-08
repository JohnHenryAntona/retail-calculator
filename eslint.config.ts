const tsParser = require('@typescript-eslint/parser')
const reactPlugin = require('eslint-plugin-react')
const tailwindPlugin = require('eslint-plugin-tailwindcss')
const prettierPlugin = require('eslint-plugin-prettier')

module.exports = [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      tailwindcss: tailwindPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'prettier/prettier': 'warn',
    },
  },
]
