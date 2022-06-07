import transformerVariantGroup from "@unocss/transformer-variant-group";
import colors from "./colors";
import gradientRules from "./gradients";

export default {
  // presets
  uno: true, // enabled `@unocss/preset-uno`
  icons: true, // enabled `@unocss/preset-icons`
  attributify: false, // enabled `@unocss/preset-attributify`,

  transformers: [transformerVariantGroup()],

  // core options
  shortcuts: [
    {
      "mode-btn":
        "flex items-center ml-1 py-1 b-0 px-3 rd-2 bg-gray-darker text-gray",
        "btn":
        "b-none p-2 rd-2 bg-gray-darker text-gray ",
    },
  ],
  rules: [...gradientRules],

  theme: {
    colors,
  },
};
