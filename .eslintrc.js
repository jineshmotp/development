module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    camelcase: 'error',
    'spaced-comment': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    quotes: ['error', 'single'],
    'no-duplicate-imports': 'error',
    'no-case-declarations': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "ImportDeclaration[source.value='react'] > ImportSpecifier[imported.name='useCallback']",
        message: 'Use useMemoizedFn from @td-design/rn-hooks instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-native'] > ImportSpecifier[imported.name='FlatList']",
        message: 'Use FlashList from @shopify/flash-list instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-redux'] > ImportSpecifier[imported.name='useSelector']",
        message: 'Use useAppSelector from @/hooks/reduxHooks instead',
      },
      {
        selector: "ImportDeclaration[source.value='react-redux'] > ImportSpecifier[imported.name='useDispatch']",
        message: 'Use useAppDispatch from @/hooks/reduxHooks instead',
      },
    ],
  },
};
