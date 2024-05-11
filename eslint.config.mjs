import js from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default [
    js.configs.recommended,

    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        rules: {
            'prettier/prettier': 'error',
            'no-unused-vars': 'error',
            semi: ['warn', 'always'],
            camelcase: 'error',
            eqeqeq: ['error', 'always'],
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
    },
]
