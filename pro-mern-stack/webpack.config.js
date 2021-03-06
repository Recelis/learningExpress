
const path = require('path');

module.exports = {
    entry: './src/App.jsx',
    output: {
        path: path.join(__dirname, './static'),
        filename: 'app.bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.jsx$/,
                loader:'babel-loader',
                query:{
                    presets:['react', 'es2015']
                },
            },
        ]
    }
};