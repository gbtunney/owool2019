const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                loader: "webpack-modernizr-loader",
                test: /\.modernizrrc\.js$/
            }
        ]
    },
    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, "/path/to/.modernizrrc.js")
        }
    }
}

console.log("HI!!")