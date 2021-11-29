module.exports = {
  extends: [require.resolve('@yueqing/lint/lib/ts-eslint')],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ["**/lib/*"],
  rules: {
    'no-console': 0,
  },
}
