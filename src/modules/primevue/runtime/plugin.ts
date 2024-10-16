import { createGlobalState, reactiveComputed, useLocalStorage } from '@vueuse/core';


declare interface AppState {
}

export default defineNuxtPlugin(({ vueApp: app }) => {

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
