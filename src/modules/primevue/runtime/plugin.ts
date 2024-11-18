import { createGlobalState, reactiveComputed, useLocalStorage } from '@vueuse/core';
import PrimeVue from 'primevue/config';
import StyleClass from 'primevue/styleclass';

declare interface AppState {
}

export default defineNuxtPlugin(({ vueApp: app }) => {
  app.use(PrimeVue);

  app.directive('styleclass', StyleClass);

  const appState = createGlobalState(
    () => useLocalStorage<AppState>('app-state', {})
  )();

  return {
    provide: {
      appState: reactiveComputed(() => appState.value)
    }
  };
});

declare module '#app' {
  interface NuxtApp {
    $appState: AppState;
  }
}
