import { defineNuxtConfig } from 'nuxt'
import unocss from './config/modules/unocss'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  buildModules: [
    '@unocss/nuxt',
  ],
  unocss
})
