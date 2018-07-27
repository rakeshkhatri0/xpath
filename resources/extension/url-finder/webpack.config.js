let path = require('path');
let webpack = require('webpack');
// html helper/copier
const HtmlWebpackPlugin = require('html-webpack-plugin');
// files copier
const CopyWebpackPlugin = require('copy-webpack-plugin');
// uglify plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        'vendor': './src/common/vendor.js',
        'background': './src/js/background.js',
        'content': './src/js/content.js',
        'option': './src/js/option.js',
        'popup': './src/js/popup.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    plugins: [
        // define global variables
        new webpack.DefinePlugin({
            'DEVMODE': JSON.stringify(argv.mode)
        }),
        new HtmlWebpackPlugin({
            filename: 'background.html',
            template: 'src/background.html',
            inject: true,
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            filename: 'option.html',
            template: 'src/option.html',
            inject: true,
            chunks: ['option', 'vendor']
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/popup.html',
            inject: true,
            chunks: ['popup', 'vendor']
        }),
        // copy static files
        new CopyWebpackPlugin([
            {from: './src/manifest.json', to: 'manifest.json'},
            {from: './src/_locales', to: '_locales'},
            {from: './src/assets', to: 'assets'},
            // hover.css styles
            {from: 'node_modules/hover.css/css/hover-min.css', to: 'assets/hover.css/css/hover-min.css'},
            // mdbootstrap
            {from: 'node_modules/mdbootstrap/css', to: 'assets/mdbootstrap/css'},
            {from: 'node_modules/mdbootstrap/font', to: 'assets/mdbootstrap/font'},
            {from: 'node_modules/mdbootstrap/img', to: 'assets/mdbootstrap/img'}
        ]),
        // make jquery available
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    watch: true,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|otf|eot|ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader',
                options: {
                    emitFile: false,
                    name: '[name].[ext]?v=[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    optimization: {
        runtimeChunk: false,
        minimize: (argv.mode === 'production' && (argv.uglify === undefined || argv.uglify === 'true')),
        minimizer: (argv.mode === 'production' && (argv.uglify === undefined || argv.uglify === 'true')) ? [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: true
            })
        ] : []
    },
    devtool: (argv.mode === 'production') ? '' : '#source-map'
});