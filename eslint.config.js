export default [
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
    },
  },
]
