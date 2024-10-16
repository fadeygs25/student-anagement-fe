// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  typescript: {
    shim: false,
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '~/modules/primevue',
  ],
  srcDir: 'src/',
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },

  build: {
    transpile: [
      'chart.js',
      'primevue'
    ]
  },
  css: [
    'primeicons/primeicons.css',
    'prismjs/themes/prism-coy.css',
  ],
})
