const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'whatwg-fetch',
        './src/index.js',
    ],
    debug: true,
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.min.js',
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader'],
        },
        {
            test: /\.scss$/,
            loader: 'style!css!sass',
        },
        {
            test: /images\/.*\.(?:png)$/i,
            loader: 'file-loader?name=images/[name].[ext]',
        }],
    },
    resolve: {
        root: ['node_modules'],
        alias: {
            '~': path.resolve(__dirname, '.'),
        },
        extensions: ['', '.js', '.jsx'],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            minimize: true,
            sourceMap: false,
            mangle: false,
        }),
    ],
};
