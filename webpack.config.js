const path = require('path');

module.exports = {
    // Entry - Where to start
    entry: './src/app.js',
    // Output - Where to output file
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // Module rules - Define what to do when certain file is loaded
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // Devtool - Help us debug. We can see where the error is in the original file instead of showing on bundle.js
    devtool: 'cheap-module-eval-source-map',
    // DevServer - This is a server designed for webpack. contentBase need the absolute path of /public
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};



