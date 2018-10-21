const config = require('config');
const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const environment = config.app.env || 'development';
const plugins = [
    {
        apply: (compiler) => {
            rimraf.sync(compiler.options.output.path)
        }
    },
    new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 4
    }),
    new webpack.ProvidePlugin({
        moment: 'moment',
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(environment),
        API_URL: JSON.stringify(`${config.api.url}`),
    })
];

if (environment === 'production') {
    plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true,
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                }
            }
        })
    ])
}

module.exports = {
    context: __dirname + '/src',
    watchOptions: {
        poll: true,
    },
    entry: './index.js',

    output: {
        path: __dirname + './../backend/src/public/build',
        publicPath: './../backend/src/public/build',
        filename: 'app.js',
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins,

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react"]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'css-loader!sass-loader'
                ),
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
        ]
    }
};
