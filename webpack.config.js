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
        filename: 'bundle.js',
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
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        },
        {
            test: /\.(pdf|htm|html)$/,
            loader: 'file-loader?name=[name].[ext]',
        },
        {
            test: /images\/.*\.(?:png|gif)$/i,
            loader: 'file-loader?name=images/[name].[ext]',
        },
        {
            test: /fonts\/.*\.(?:eot|otf|svg|ttf|woff)(?:\?[a-z0-9=.]+)?$/i,
            loader: 'file-loader?name=fonts/[name].[ext]',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
};
