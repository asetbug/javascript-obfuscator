'use strict';

const webpack = require('webpack');
const packageJson = require('pjson');

const WebpackUtils = require('./utils/WebpackUtils').WebpackUtils;

module.exports = {
    devtool: 'source-map',
    entry: {
        'index': './index.ts'
    },
    target: 'web',
    module: {
        exprContextCritical: false,
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'awesome-typescript-loader',
                query: {
                    useBabel: true,
                    babelCore: '@babel/core',
                    useCache: true,
                    forceIsolatedModules: true,
                    configFileName: 'tsconfig.web.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new webpack.BannerPlugin(
            {
                banner: WebpackUtils.getBannerText(WebpackUtils.getLicenseText()),
                raw: true,
                entryOnly: false
            }
        ),
        new webpack.EnvironmentPlugin({
            VERSION: packageJson.version
        })
    ],
    output: {
        libraryTarget: 'var',
        library: 'JavaScriptObfuscator',
        filename: 'index.web.js'
    },
    performance: {
        hints: false
    },
    stats: {
        maxModules: 0,
        warnings: false
    }
};