import { VueLoaderPlugin } from 'vue-loader'
import { Configuration } from 'webpack';

export function webpack(config: Configuration) {
  return {
    ...config,
    plugins: [...(config.plugins || []), new VueLoaderPlugin()],
    module: {
      ...config.module,
      rules: [
        ...((config.module || { rules: [] }).rules || []),
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          options: {},
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true,
                appendTsSuffixTo: [/\.vue$/],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...((config.resolve || {}).extensions || []), '.vue'],
      alias: {
        ...(config.resolve || {}).alias,
        vue$: require.resolve('vue/dist/vue.esm-browser.js'),
      },
    },
  };
}
