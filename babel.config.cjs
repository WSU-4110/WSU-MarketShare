module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            },
            modules: false // This tells Babel to keep ES modules
        }]
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
};