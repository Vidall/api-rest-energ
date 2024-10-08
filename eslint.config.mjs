import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'linebreak-style': [
        'error',
        'windows'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'always'
      ],
      'no-multiple-empty-lines': [
        'error',
        { max: 1, maxEOF: 1, maxBOF: 0 }
      ]

    }
  },
];