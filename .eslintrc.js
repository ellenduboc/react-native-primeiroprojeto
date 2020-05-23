module.exports = {
    root: true,
    extends: ['@react-native-community', 'prettier', 'prettier/react'],
    rules: {
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.js', '.jsx'] }
        ],
        'import/prefer-default-export': 'off',
        'jsx-quotes': ['error', 'prefer-single']
    }
};
