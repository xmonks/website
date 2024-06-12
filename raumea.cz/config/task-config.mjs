import OpenProps from "open-props";
import jitProps from "postcss-jit-props";
import pathConfig from "./path-config.json" assert { type: "json" };

export default {
  images: true,
  cloudinary: false,
  fonts: true,
  static: true,
  svgSprite: true,
  javascripts: false,
  esbuild: true,

  browserSync: false,

  generate: {
    exclude: ["references.json"],
    json: [{
      collection: "references",
      mergeOptions: {
        concatArrays: true,
        startObj: [],
        edit(json) {
          return [json];
        }
      }
    }],
  },

  html: {
    collections: ["references"]
  },

  stylesheets: {
    postcss: {
      plugins: [
        jitProps(OpenProps),
      ],
    },
  },

  workboxBuild: {
    globDirectory: pathConfig.dest,
    globPatterns: ["**/*.{html,json,js,css,png,jpg,gif,svg}"],
    // Create service-worker.js source file and define `swSrc` to use `injectManifest` method
    // swSrc: `${pathConfig.src}/sw.js`,
    swDest: `${pathConfig.dest}/sw.prod.js`,
  },

  production: {
    rev: true,
  },

  watch: {
    tasks: [],
  },
};
