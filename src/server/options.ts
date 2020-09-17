const packageJson = require('../../package.json');

export default {
  packageJson,
  framework: 'vue3',
  frameworkPath: '@andoshin11/storybook-vue3',
  frameworkPresets: [require.resolve('./framework-preset-vue.js')],
};
