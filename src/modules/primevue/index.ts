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

const primevueComponents = [
  'Accordion',
  'AccordionTab',
  'AutoComplete',
  'Avatar',
  'AvatarGroup',
  'Badge',
  'BlockUI',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'CascadeSelect',
  'Chart',
  'Checkbox',
  'Chip',
  'Chips',
  'ColorPicker',
  'Column',
  'ColumnGroup',
  'ConfirmDialog',
  'ConfirmPopup',
  'ContextMenu',
  'DataTable',
  'DataView',
  'DataViewLayoutOptions',
  'DeferredContent',
  'Dialog',
  'Divider',
  'Dock',
  'Dropdown',
  // 'Editor',
  'Fieldset',
  'FileUpload',
  // 'FullCalendar',
  'Galleria',
  'Image',
  'InlineMessage',
  'Inplace',
  'InputMask',
  'InputNumber',
  'InputSwitch',
  'InputText',
  'Knob',
  'Listbox',
  'MegaMenu',
  'Menu',
  'Menubar',
  'Message',
  'MultiSelect',
  'OrderList',
  'OrganizationChart',
  'OverlayPanel',
  'Paginator',
  'Panel',
  'PanelMenu',
  'Password',
  'PickList',
  'ProgressBar',
  'ProgressSpinner',
  'RadioButton',
  'Rating',
  'ScrollPanel',
  'ScrollTop',
  'SelectButton',
  'Sidebar',
  'Skeleton',
  'Slider',
  'SpeedDial',
  'SplitButton',
  'Splitter',
  'SplitterPanel',
  'Steps',
  'TabMenu',
  'TabPanel',
  'TabView',
  'Tag',
  'Terminal',
  'TerminalService',
  'Textarea',
  'TieredMenu',
  'Timeline',
  'Toast',
  'ToggleButton',
  'Toolbar',
  'Tree',
  'TreeSelect',
  'TreeTable',
  'TriStateCheckbox',
  'VirtualScroller'
] as const;


type PrimeVueConfig = ReturnType<typeof usePrimeVue>['config'];


type PrimevueComponents = typeof primevueComponents[number];

async function registerComponent(name: PrimevueComponents, global = true) {
  await addComponent({
    export: 'default',
    filePath: `primevue/${name.toLowerCase()}`,
    global: (['ConfirmDialog', 'ConfirmPopup', 'Toast', 'Tooltip'].includes(name) || global),
    name
  });
}

export interface PrimeVueOptions extends PrimeVueConfig {
  components?: {
    global?: boolean
  };
}


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
