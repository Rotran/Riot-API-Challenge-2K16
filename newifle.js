const webpackConfig = {
    entry: {
        app: path.resolve(__dirname, 'public', 'app.js'),
        'app-header': path.resolve(__dirname, 'public', 'app-header.js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
            },
            {
                test: /\.svg$/,
                include: [
                    path.resolve(__dirname, 'public', 'images'),
                ],
                exclude: /(node_modules|bower_components)/,
                loader: 'svg-inline',
            },
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '.build'),
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(
                'bower.json', ['main']
            )
        ),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    resolve: {
        root: [
            path.resolve(__dirname),
        ],
        alias: {
            components: 'public/components',
        },
        modulesDirectories: [
            'bower_components',
            'node_modules',
            'web_modules',
        ],
    },
};

export { webpackConfig };
