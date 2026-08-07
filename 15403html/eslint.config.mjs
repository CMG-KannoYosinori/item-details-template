import js from "@eslint/js";
import globals from "globals";

export default [
  // js/recommended を直接展開
  {
    ...js.configs.recommended,
    files: ["**/*.{js,mjs,cjs}"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
];
