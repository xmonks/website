import { texyTypography } from "@hckr_/blendid/lib/texy.mjs";
import OpenProps from "open-props";
import jitProps from "postcss-jit-props";

export default {
  images: true,
  cloudflare: true,
  cloudinary: false,
  fonts: true,
  static: true,
  svgSprite: true,
  esbuild: true,

  html: {
    markedExtensions: [texyTypography("cs")],
  },

  stylesheets: {
    postcss: {
      plugins: [jitProps(OpenProps)],
    },
  },
};
