import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Flat config. ESLint 10 dropped `.eslintrc.*` support, and Next 16 removed the
 * `next lint` command, so linting now runs through the `eslint` CLI directly
 * (see the `lint` script in package.json).
 */
const config = [
  {
    // `next lint` used to pick these up from .gitignore automatically; the
    // eslint CLI does not, so build output must be listed explicitly.
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "coverage/**",
      ".vercel/**",
      ".claude/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
