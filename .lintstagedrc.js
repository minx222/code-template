/**
 * lint-staged 校验暂存区的文件
 */
module.exports = {
  'src/**/*.{js,ts,tsx,jsx,vue}': ['eslint --fix --max-warnings 1000'],
  'src/**/*.{css,less,scss}': ['prettier --write']
}
