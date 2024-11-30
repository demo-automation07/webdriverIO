import globals from "globals";
import pluginMocha from "eslint-plugin-mocha";
import pluginChaiFriendly from "eslint-plugin-chai-friendly";
import babelParser from "@babel/eslint-parser"; // Import Babel parser explicitly

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      parser: babelParser, // Directly reference the parser function here
      parserOptions: {
        requireConfigFile: false, // Disable Babel config file check
      },
      globals: {
        ...globals.mocha,
        ...globals.browser,  // WebDriverIO browser globals
        ...globals.node,     // Node.js globals (e.g., process, require)
        allure: "readonly",  // Mark 'allure' as a global (readonly)
        browser: "readonly", // Mark 'browser' as a global (readonly)
        $: "readonly",       // Mark '$' (WebDriverIO) as a global (readonly)
        $$: "readonly",      // Mark '$$' (WebDriverIO) as a global (readonly)
        Key: "readonly",     // Mark 'Key' (WebDriverIO) as a global (readonly)
      },
      ecmaVersion: 9,           // Use ECMAScript version 9 (ES2019)
      sourceType: "module",     // Allow ES modules (import/export)
    },
    plugins: {
      mocha: pluginMocha,   // Mocha plugin for Mocha-specific linting
      "chai-friendly": pluginChaiFriendly,    // Chai plugin for assertion-style rules
    },
    rules: {
      "mocha/no-exclusive-tests": "error",   // Prevent using .only (exclusive tests)
      "chai-friendly/no-unused-expressions": "error",  // Ensure correct use of chai assertions
      "semi": "error",                       // Enforce semicolons
      "prefer-const": "error",               // Prefer 'const' over 'let' where possible
      "no-unused-vars": "warn",              // Warn about unused variables
      "no-console": "off",                   // Allow console logs
      "no-undef": "error",                  // Prevent usage of undefined variables
      "no-async-promise-executor": "warn",   // Warn if async function is used as a promise executor
      "no-unused-expressions": "off", // Disable the original rule
    },
    ignores: [
      "node_modules/",  // Ignore node_modules directory
      "dist/",          // Ignore build output directories
      "coverage/",      // Ignore coverage reports
      "**/config/**",
      "**/reports/**",
      "**/report/**",
      ".log",
      "**/log/**",
      "**/logs/**",
      "wdio.conf.js"

    ],
  },
];
