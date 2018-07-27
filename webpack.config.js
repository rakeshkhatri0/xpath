let path = require('path');
let webpack = require('webpack');
// files copier
const CopyWebpackPlugin = require('copy-webpack-plugin');
// uglify plugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({
    entry: {
        'app': './resources/src/app.js',
        'vendor': './resources/src/common/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    plugins: [
        // define global variables
        new webpack.DefinePlugin({
            'DEVMODE': JSON.stringify(argv.mode)
        }),
        // copy static files
        new CopyWebpackPlugin([
            // mdbootstrap static files
            {from: 'node_modules/mdbootstrap/css', to: 'mdbootstrap/css'},
            {from: 'node_modules/mdbootstrap/font', to: 'mdbootstrap/font'},
            {from: 'node_modules/mdbootstrap/img', to: 'mdbootstrap/img'}
        ]),
        // make jquery available
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
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
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
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
        contentBase: path.join(__dirname, 'public'),
        overlay: true,
        port: 8090,
        proxy: {
            '/': 'http://localhost:8080'
        }
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