import { dirname } from "path";
import { fileURLToPath } from "url";
import eslint from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  eslint.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];

export default eslintConfig;
