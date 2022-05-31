import transformerVariantGroup from '@unocss/transformer-variant-group'
import colors from './colors'
import gradientRules from './gradients'

export default {
  // presets
  uno: true, // enabled `@unocss/preset-uno`
  icons: true, // enabled `@unocss/preset-icons`
  attributify: false, // enabled `@unocss/preset-attributify`,

  transformers: [transformerVariantGroup()],

  // core options
  shortcuts: [],
  rules: [...gradientRules],

  theme: {
    colors,
  },
}
