/* eslint-disable prefer-destructuring */
import { ComponentOptions, defineComponent, h, Component } from 'vue';
const { start } = require('@storybook/core/client')
import {
  ClientStoryApi,
  StoryFn,
  DecoratorFunction,
  StoryContext,
  Loadable,
} from '@storybook/addons';

import './globals';
import { IStorybookSection, StoryFnVueReturnType } from './types';

import render, { propsContainer } from './render';
import { extractProps } from './util';

function prepare(
  rawStory: StoryFnVueReturnType,
  innerStory?: ComponentOptions
): Component | null {
  let story: ComponentOptions;

  if (typeof rawStory === 'string') {
    story = { template: rawStory } as ComponentOptions;
  } else if (rawStory != null) {
    story = rawStory;
  } else {
    return null;
  }

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  if (innerStory) {
    story.components = { story: innerStory }
    return story
  }

  propsContainer.props = extractProps(story.props)

  return defineComponent({
    render() {
      return h(story, propsContainer.props)
    }
  })
}

const defaultContext: StoryContext = {
  id: 'unspecified',
  name: 'unspecified',
  kind: 'unspecified',
  parameters: {},
  args: {},
  argTypes: {},
  globals: {},
};

function decorateStory(
  storyFn: StoryFn<StoryFnVueReturnType>,
  decorators: DecoratorFunction<any>[]
): StoryFn<any> {
  const result = decorators.reduce(
    (decorated: StoryFn<any>, decorator) => (context: StoryContext = defaultContext) => {
      let story;

      const decoratedStory = decorator(
        ({ parameters, ...innerContext }: StoryContext = {} as StoryContext) => {
          story = decorated({ ...context, ...innerContext });
          return story;
        },
        context
      );

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      return prepare(decoratedStory, story);
    },
    (context) => prepare(storyFn(context))
  );

  return result
}

const framework = 'vue3';

interface ClientApi extends ClientStoryApi<StoryFnVueReturnType> {
  setAddon(addon: any): void;
  configure(loader: Loadable, module: NodeModule): void;
  getStorybook(): IStorybookSection[];
  clearDecorators(): void;
  forceReRender(): void;
  raw: () => any; // todo add type
  load: (...args: any[]) => void;
}

const api = start(render, { decorateStory });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) => {
  return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    framework,
  });
};

export const configure: ClientApi['configure'] = (...args) => api.configure(framework, ...args);
export const addDecorator: ClientApi['addDecorator'] = api.clientApi.addDecorator;
export const addParameters: ClientApi['addParameters'] = api.clientApi.addParameters;
export const clearDecorators: ClientApi['clearDecorators'] = api.clientApi.clearDecorators;
export const setAddon: ClientApi['setAddon'] = api.clientApi.setAddon;
export const forceReRender: ClientApi['forceReRender'] = api.forceReRender;
export const getStorybook: ClientApi['getStorybook'] = api.clientApi.getStorybook;
export const raw: ClientApi['raw'] = api.clientApi.raw;
