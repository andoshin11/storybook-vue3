const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'vue3',
  frameworkPath: '../',
  frameworkPresets: [require.resolve('./framework-preset-vue.js')],
};
