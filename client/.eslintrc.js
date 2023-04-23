module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        browser: true,
        es2021: true,
        node: true,
        es6: true,
        commonjs: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        camelcase: 'error',
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['#region', '#endregion', 'region', 'endregion'],
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
        'no-duplicate-imports': 'error',
        '@typescript-eslint/no-unused-vars': ['off'],
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
