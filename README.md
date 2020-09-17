# @andoshin11/storybook-vue3 ![npm (scoped)](https://img.shields.io/npm/v/@andoshin11/storybook-vue3) ![GitHub](https://img.shields.io/github/license/andoshin11/storybook-vue3)

Storybook for Vue 3 is an unofficial UI development environment for your Vue 3 components.
With it, you can visualize different states of your UI components and develop them interactively.

![Storybook Screenshot](https://github.com/storybookjs/storybook/blob/master/media/storybook-intro.gif)

Storybook runs outside of your app.
So you can develop UI components in isolation without worrying about app specific dependencies and requirements.

## :warning: WARNING :warning:
This library is not well tested on production environment, so you may face a lot of bugs.
Please let me know through GitHub Issues when you see those.

## Peer Dependencies
It's strongly recommended to preinstall these versions of libraris before setup your project.

- @storybook/core@^6.1.0-alpha.9,
- @vue/compiler-sfc@^3.0.0-0,
- ts-loader@^8.0.3,
- vue@^3.0.0-0,
- vue-loader@^16.0.0-beta.7

## Getting Started

```sh
$ cd my-vue3-app
$ yarn add -D @andoshin11/storybook-vue3
$ node_modules/.bin/start-storybook -p 6006
```

For more information visit: [storybook.js.org](https://storybook.js.org)

---

Storybook also comes with a lot of [addons](https://storybook.js.org/docs/vue/configure/storybook-addons) and a great API to customize as you wish.
You can also build a [static version](https://storybook.js.org/docs/vue/workflows/publish-storybook) of your storybook and deploy it anywhere you want.

## Vue Notes

- When using global custom components or extension (e.g `Vue.use`). You will need to declare those in the `./storybook/preview.js`.
