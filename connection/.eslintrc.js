module.exports = {
  root: true,
  env: {
    jasmine: true,
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: ['prettier'],
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.spec.json'],
      },
      extends: [
        'eslint:recommended',
        'airbnb-typescript/base',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:@angular-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prettier/prettier': 'error',
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'dot-notation': 'off',
      },
    },
    {
      files: ['*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        'plugin:@angular-eslint/template/accessibility',
      ],
      rules: {},
    },
    {
      files: ['*.ts'],
      extends: ['plugin:@ngrx/recommended-requiring-type-checking'],
    },
  ],
};
