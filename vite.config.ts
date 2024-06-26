import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite";
import pxtovw from "postcss-px-to-viewport-8-plugin";

const pathSrc = path.resolve(__dirname, "src");

const loder_pxtovw = (pxtovw as any)({
  viewportWidth: 1920,
  viewportUnit: "vw",
  selectorBlackList: [], // 需要忽略转换的选择器
  // exclude: [/node_modules\/element-plus/i],
});

// https://vitejs.dev/config/
export default defineConfig({
  // base: process.env.NODE_ENV === "production" ? "./" : "/",
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  base: "./",
  plugins: [
    vue(),
    ReactivityTransform(),
    AutoImport({
      imports: [
        "vue",
        "vue-router", // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            "useDateFormat",
            "useNow",
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
        },
      ],
      // eslint报错解决
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        ElementPlusResolver(),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
    Icons({
      autoInstall: true,
    }),
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/icons")],
      // 执行icon name的格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  build: {
    chunkSizeWarningLimit: 10000, //消除触发警告的 chunk, 默认500k
    // assetsDir: "static/assets",
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/dev-api": {
        target: "http://xzsp-paishui-dev-back.cnsaas.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/assets/styles/var.scss' as *;`,
      },
    },
    postcss: {
      // plugins: [loder_pxtovw],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
