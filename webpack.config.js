var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var srcDir = path.resolve(process.cwd(), 'src');

module.exports = {
    cache: true,
    devtool: "source-map",
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "dist/js/"),
        publicPath: "dist/js/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    watch: true,
    resolve: {
        extensions: ['', '.js', '.vue'],
        modulesDirectories: ['node_modules'],
        alias: {
            jquery  : srcDir + "/js/lib/jquery/jquery.min",
            layer   : srcDir + '/js/lib/layer_mobile/layer',
            lib     : srcDir + '/js/lib',
            base    : srcDir + "/js/base"
        }
    },
    module: {
        loaders: [
          // 使用vue-loader 加载 .vue 结尾的文件
          {
            test: /\.vue$/,
            loader: 'vue'
          },
          {
            test: /\.js$/,
            // excluding some local linked packages.
            // for normal use cases only node_modules is needed.
            exclude: /node_modules|vue\/src|vue-router\//,
            loader: 'babel'
          },
          { 
            test: /\.(scss|sass|css)$/, loader: 'style-loader!css-loader!sass-loader'
          }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new CommonsChunkPlugin('common.js'),
        new uglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ]
};


//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}