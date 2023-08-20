module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react-hooks'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    // ERRORS
    'no-alert': 'error', // Window alert statements
    'no-console': 'error', // Console statements
    'no-debugger': 'error', // Debugger statements
    'no-promise-executor-return': 'error', // Returning value inside a promise
    'no-self-compare': 'error', // Comparing to self, eg if (x === x)
    'no-var': 'error', // Using 'var'
    'react-hooks/exhaustive-deps': 'error', // Missing react dependencies
    'react-hooks/rules-of-hooks': 'error', // Following react hook rules

    // WARNINGS
    eqeqeq: 'warn', // Using == instead of ===
    'no-bitwise': 'warn', // Using bitwise operators which can be confused with boolean operators
    'no-case-declarations': 'warn', // Defining variables inside switch/case
    'no-dupe-else-if': 'warn', // Identical if/else if statements
    'no-dupe-keys': 'warn', // Duplicate keys in object
    'no-duplicate-case': 'warn', // Duplicate switch case statements
    'no-duplicate-imports': 'warn', // Duplicate import statements
    'no-extra-boolean-cast': 'warn', // Unneeded boolean casting
    'no-extra-semi': 'warn', // Unneeded semicolons are used
    'no-fallthrough': 'warn', // Missing break statements
    'no-nested-ternary': 'warn', // Nested ternary operators
    'no-param-reassign': 'warn', // Modification of function params
    'no-shadow': 'warn', // When a variable name is being shadowed, eg function test(name: string) { const name = '' }
    'no-unreachable': 'warn', // Dead code after function return
    'no-unsafe-optional-chaining': 'warn', // When ?. is used needlessly
    'no-useless-computed-key': 'warn', // When using useless computed keys, eg { ['id']: 123 } => { id: 123 }
    'no-useless-concat': 'warn', // When useless string concatenation is used, eg 'a' + 'b' => 'ab'
    'no-useless-rename': 'warn', // When object property is renamed to itself, eg { name: name }
    'no-warning-comments': 'warn', // Using TODO and FIXME
    'prefer-const': 'warn', // When 'let' is used instead of 'const'
    'prefer-exponentiation-operator': 'warn', // When x ** y can be used instead of Math.pow()
    'prefer-rest-params': 'warn', // Prefer rest parameters (...params) instead of 'args'
    'prefer-template': 'warn', // When string concatenation is used instead of template literals
    'quote-props': ['warn', 'as-needed'], // Enforce either all object key to have (or not) quotes
    'require-await': 'warn', // When async functions do not 'await'
    'use-isnan': 'warn', // When isNaN is not used to check for NaN
    
    // OK
    'no-prototype-builtins': 'off', // Allow Object.hasOwnProperty()
    'no-undef': 'off', // Allow undeclared variables, eg. React.FC
    'no-unused-vars': 'off', // Allow variables are declared but unused
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  globals: {
    NodeJS: true
  }
};
