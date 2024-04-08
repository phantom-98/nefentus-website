import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs/promises";
import { resolve } from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default ({ mode }) => {
  env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: "/",
    plugins: [react()],
    esbuild: {
      loader: "jsx",
      include: /src\/.*\.jsx?$/,
      // loader: "tsx",
      // include: /src\/.*\.[tj]sx?$/,
      exclude: [],
    },
    build: {
      // minify: false,
      // target: "es2015",
      //outDir: 'dist_web',
      sourcemap: true,
      commonjsOptions: { include: [] },
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          nodePolyfills({
            include: ["node_modules/**/*.js", "../../node_modules/**/*.js"],
          }),
        ],
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        process: "rollup-plugin-node-polyfills/polyfills/process-es6",
        buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
        events: "rollup-plugin-node-polyfills/polyfills/events",
        util: "rollup-plugin-node-polyfills/polyfills/util",
        sys: "util",
        stream: "rollup-plugin-node-polyfills/polyfills/stream",
        _stream_duplex:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
        _stream_passthrough:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
        _stream_readable:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
        _stream_writable:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
        _stream_transform:
          "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
      },
    },
    optimizeDeps: {
      disabled: false,
      esbuildOptions: {
        plugins: [
          {
            name: "load-js-files-as-jsx",
            setup(build) {
              build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                loader: "jsx",
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
          NodeGlobalsPolyfillPlugin({
            process: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },
    define: {
      "process.env": env,
    },
  });
};
