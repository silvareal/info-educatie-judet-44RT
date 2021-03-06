const path = require('path');

module.exports = {

    entry: path.join(__dirname, '/src/public/app.jsx'),

    output: {
        path: path.join(__dirname, '/src/build'),
        filename: 'index.js',
    },


    module: {
        loaders: [
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, '/src/public'),
                loader: 'babel',
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            }],
    },

    watch: true
};
