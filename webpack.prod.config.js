var webpack = require("webpack");
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var outputDir = __dirname + "/dist";

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = require('./webpack.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  __dirname + '/' + module.exports.app_root + '/index.js'
];



// production env
module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  })
);


module.exports.output= {
    path: __dirname + '/dist',
    publicPath: '',
    filename: 'js/bundle.[hash].js',
},

// compress the js file
module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  })
);

module.exports.plugins.push(new HtmlWebpackPlugin({
    title: 'QA Draught test application',
    // Load a custom template (lodash by default see the FAQ for details)
    template: 'public/index-template.html'
  }));

module.exports.plugins.push(new CleanWebpackPlugin(['dist'])),

// export css to a separate file
module.exports.module.loaders[2] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass'),
};

module.exports.plugins.push(
  new ExtractTextPlugin('css/main.[hash].css')
);

module.exports.plugins.push(new CopyWebpackPlugin([{
  from : __dirname + '/public/media', to : "media/"
}]));

// Hashing of this kind happens only in prod.
module.exports.plugins.push(
  // To rewrite stuff like `bundle.js` to `bundle-[hash].js` in files that refer to it, I tried and
  // didn't like the following plugin: https://github.com/ampedandwired/html-webpack-plugin
  // for 2 reasons:
  //    1. because it didn't work with HMR dev mode...
  //    2. because it's centered around HTML files but I also change other files...
  // I hope we can soon find something standard instead of the following hand-coding.
  function () {
    this.plugin("done", function (stats) {
        var replaceInFile = function (filePath, toReplace, replacement) {
            var replacer = function (match) {
                console.log('Replacing in %s: %s => %s', filePath, match, replacement);
                return replacement
            };
            var str = fs.readFileSync(filePath, 'utf8');
            var out = str.replace(new RegExp(toReplace, 'g'), replacer);
            fs.writeFileSync(filePath, out);
        };

        var hash = stats.hash; // Build's hash, found in `stats` since build lifecycle is done.

        replaceInFile(path.join(outputDir, 'index.html'),
            'bundle.js',
            'bundle.' + hash + '.js'
        );

        replaceInFile(path.join(outputDir, 'index.html'),
            'main.css',
            'main.' + hash + '.css'
        );
    });
  }
);

