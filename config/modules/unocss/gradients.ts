import type { RuleContext } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'
import { colorToString, parseColor } from '@unocss/preset-mini/utils'

const bgBorderColorResolver = ([, body]: string[], { theme }: RuleContext<Theme>) => {
  const data = parseColor(body, theme)
  if (!data) return

  const { color, cssColor } = data

  if (color)
    return {
      '--border-color': color,
    }

  if (cssColor)
    return {
      '--un-border-opacity': cssColor.alpha ?? 1,
      '--border-color': colorToString(cssColor, `var(--un-border-opacity)`),
    }
}

const gradientResolver = ([, name, deg = '90']: string[]) => {
  deg = deg + 'deg'

  return {
    '--deg': deg,
    '--border-color': 'white',
    background: `linear-gradient(var(--deg), var(--border-color) 0%, var(--border-color) 50%, var(--an-${name}))`,
  }
}

const normalGradientResolver = ([, name, deg = '90']: string[]) => {
  deg = deg + 'deg'

  return {
    '--deg': deg,
    background: `linear-gradient(var(--deg), var(--${name}))`,
  }
}

export default [
  // e.g. bg-an-gradient-pink, bg-an-gr-pink
  // e.g. bg-an-gradient-pink-90, bg-an-gr-pink-90
  // an == animated gradient
  [/^(?:bg-an-gradient|bg-an-gr)-(.+)/, gradientResolver],
  [/^(?:bg-an-gradient|bg-an-gr)-(.+)-(\d+)/, gradientResolver],
  [/^(?:bg-an-gradient|bg-an-gr)-(.+)-(?:color)-(\d+)/, gradientResolver],

  [/^(?:gr-b|grb)-(.+)$/, bgBorderColorResolver, { autocomplete: ['(gr-b|grb)-$colors'] }],

  // e.g. bg-gradient-pink
  // animated gradient border example
  // before:p-0.25 after:p-0.25 position-relative grb-b grb-a after:opacity-100 after:bg-gray-raisin before:bg-blue before:opacity-0 hover:(before:opacity-100 after:opacity-0 before:p-0.50)
  [/^(?:bg-gradient|bg-gr)-(.+)$/, normalGradientResolver],
  [/^(?:bg-gradient|bg-gr)-(.+)-(\d+)$/, normalGradientResolver],

  // e.g. background-position - bg-xy-0-10
  [
    /^bg-xy-(.+)-(.+)$/,
    ([, x, y]) => ({ 'background-position': `${x}% ${y}%` }),
    { autocomplete: ['(bg-xy-<num>-<num>'] },
  ],
  // e.g. bg-w-100%
  [/^bg-w-(.+)$/, ([, w]) => ({ 'background-size': `${w}% auto` }), { autocomplete: ['(bg-w-<num>'] }],
  // e.g. bg-h-100%
  [/^bg-h-(.+)$/, ([, h]) => ({ 'background-size': `auto ${h}%` }), { autocomplete: ['(bg-h-<num>'] }],
  // e.g. bg-wh-100%-50%
  [/^bg-wh-(.+)-(.+)$/, ([, w, h]) => ({ 'background-size': `${w}% ${h}%` }), { autocomplete: ['(bg-wh-<num>-<num>'] }],
]
