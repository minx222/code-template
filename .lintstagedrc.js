/**
 * lint-staged 校验暂存区的文件
 */
module.exports = {
  './**/*.{js,ts,tsx,jsx}': ['biome lint'],
};
