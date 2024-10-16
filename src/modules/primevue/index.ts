import {
  addComponent,
  addImports,
  addPlugin,
  addPluginTemplate,
  createResolver,
  defineNuxtModule,
  normalizeTemplate
} from '@nuxt/kit';
import serialize from 'serialize-javascript';
import { isArray, isObject } from '@whoj/utils';
import type { usePrimeVue } from 'primevue/config';


export default defineNuxtModule<PrimeVueOptions>({
  meta: {
    configKey: 'primevue'
  },
  defaults: {
    components: {
      global: true
    },
    ripple: true,
    inputStyle: 'outlined'
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    nuxt.options.build.transpile.push(
      resolve('./runtime/plugin')
    );

    addImports(
      { from: 'primevue/config', name: 'usePrimeVue' }
    );


    addPlugin(resolve('./runtime/plugin'));

    nuxt.hook('prepare:types', ({ references }) => {
      references.push(
        { types: 'primevue/config' }
      );
    });
  }
});
