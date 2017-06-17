var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/ts/entry.ts",
    output: {
        filename: "./build/bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            // {output}/to/file.txt
            { from: 'src/index.html', to: 'build' }
            ])
    ]
};