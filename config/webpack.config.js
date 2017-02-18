var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var preprocess = require('preprocess').preprocess;
var sass = require('node-sass');
var fs = require('fs-extra');
var path = require('path');
var utils = require('./utils');

function buildLibs(env) {
    utils.concat([
        'node_modules/reflect-metadata/Reflect.js',

        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/jquery.cookie/jquery.cookie.js',
        'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
    ], 'build/libs.js');

    
    // material.css
    fs.writeFileSync('build/material.css', sass.renderSync({
        file: 'src/css/_material.scss',
        outputStyle: 'compressed',
    }).css);
}


module.exports = function (env) {
    var isAOT = env.ENV !== 'dev';
    var basePath = isAOT ? './_aot' : './src';
    var suffix = isAOT ? '.aot' : '';
    var preprocessCopy = function (content, path) {
        if (/\.(html)$/.test(path)) {
            return preprocess(content, env);
        }
        return content;
    }
    fs.emptyDirSync('./build');
    console.log('concating libs...');
    buildLibs(env.ENV);
    console.log('build app...');
    var config = {
        profile: true,
        devtool: false,
        entry: {
            main: basePath + '/app/main' + suffix
        },
        output: {
            path: "./build",
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            publicPath: "./"
        },
        resolve: {
            extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html'],
            modules: [path.join(__dirname, "../node_modules")]
        },
        module: {
            rules: [
                { enforce: 'pre', test: /\.tsx?$/, loader: 'tslint-loader', exclude: [/(node_modules)/] },
                { test: /\.ts$/, loaders: ['awesome-typescript-loader?configFileName=' + (isAOT ? '_aot' : 'src') + '/app/tsconfig.json', 'angular2-template-loader', 'preprocess-loader?ENV=' + env.ENV, 'angular-router-loader' + (isAOT ? '?aot=true&genDir=./' : '')], exclude: [/\.(spec|e2e)\.ts$/] },
                { test: /\.html$/, loaders: ['raw-loader', 'preprocess-loader?ENV=' + env.ENV] },
                { test: /\.(css|scss)$/, loaders: ['to-string-loader', 'css-loader?importLoaders=1', 'postcss-loader?config=config/postcss.config.js'] },
            ],
            exprContextCritical: false
        },
        plugins: [
            new webpack.DefinePlugin({
                IS_PRODUCTION: JSON.stringify(isAOT)
            }),
            new CopyWebpackPlugin([
                { from: './src/index.html', transform: preprocessCopy },
                { context: './src/assets/', from: '**/*.*' }
            ]),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        ],
        devtool: 'source-map',
        performance: {
            hints: false
        },
        node: {
            __filename: true
        },
        devServer: {
            inline: true,
            port: 8080,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
        },
        stats: {
            chunks: false
        }
    };
    if (isAOT) {
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: { screw_ie8: true },
                mangle: { screw_ie8: true },
                output: {
                    beautify: false,
                    comments: false
                },
                sourceMap: true,
                debug: false,
                compressor: {
                    warnings: false
                }
            })
        );
        config.plugins.push(
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        );
    }

    return config;
}