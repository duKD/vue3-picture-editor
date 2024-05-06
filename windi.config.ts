import { defineConfig } from "windicss/helpers";
// import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
  darkMode: "class",
  //
  safelist: "container",
  theme: {
    extend: {
      colors: {
        teal: {
          100: "#096",
        },
      },
    },
  },
  //   plugins: [formsPlugin],
});
