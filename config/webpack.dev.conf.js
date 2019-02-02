/* eslint-disable no-undef */
const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const isDevelopment = process.env.NODE_ENV === 'development';

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    resolve: {
        modules: ['./node_modules'],
        alias: {
            jQuery: path.resolve('./node_modules/jquery'),
            $: path.resolve('./node_modules/jquery'),
            'vue$': 'vue/dist/vue.esm.js',
            '@vue': path.resolve('./src/assets/js/vue'),
            'node_modules': resolve('./node_modules'),
            '@node': resolve('./node_modules'),
            '@': path.resolve('./src/assets/js/vue'),
            'scripts': path.resolve('./src/assets/js'),
            'assets': path.resolve(__dirname, 'assets'),
            'styles': path.resolve(__dirname, 'assets/g-Patternlab')
        },
        extensions: ['.js', '.css', '.json', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
};

//console.debug(__dirname,part);
