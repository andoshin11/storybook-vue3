import { Args } from '@storybook/addons';
import dedent from 'ts-dedent';
import { createApp, h, shallowRef, reactive } from 'vue';
import { RenderContext, StoryFnVueReturnType } from './types';

let mounted = false

const activeComponent = shallowRef<StoryFnVueReturnType | null>(null)
export const propsContainer = reactive<{ props: Args }>({ props: {} });

const root = createApp({
  setup() {
    return () => {
      if (!activeComponent.value) throw new Error();
      return h(activeComponent.value, propsContainer.props);
    }
  }
});

export default function render({
  storyFn,
  kind,
  name,
  args,
  showMain,
  showError,
  showException
}: RenderContext) {
  // @ts-ignore
  root.config.errorHandler = showException

  const element: StoryFnVueReturnType = storyFn();
  propsContainer.props = args

  if (!element) {
    showError({
      title: `Expecting a Vue component from the story: "${name}" of "${kind}".`,
      description: dedent`
        Did you forget to return the Vue component from the story?
        Use "() => ({ template: '<my-comp></my-comp>' })" or "() => ({ components: MyComp, template: '<my-comp></my-comp>' })" when defining the story.
      `,
    });
    return;
  }

  showMain();

  activeComponent.value = element
  if (!mounted) {
    root.mount('#root');
    mounted = true;
  }
}
