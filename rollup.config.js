import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/tomtut-pool-heatpump-card.js",
  output: {
    file: "tomtut-pool-heatpump-card.js",
    format: "es",
  },
  plugins: [
    resolve(),
    terser({
      format: { comments: /^!/ },
    }),
  ],
};
