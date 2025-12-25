/**
 * lint-staged: chỉ chạy tool trên FILE ĐÃ STAGE.
 * Flow:
 *  - prettier: format trước
 *  - eslint: fix lỗi có thể auto-fix
 */
module.exports = {
  // Format các loại file phổ biến
  '*.{ts,js,mjs,cjs,html,css,scss,json,md}': ['prettier --write'],

  // Lint + fix cho TS/JS
  '*.{ts,js,mjs,cjs}': ['eslint --fix'],
};
