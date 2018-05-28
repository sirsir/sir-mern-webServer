var path = require('path');
var webpack = require('webpack');

// var glob = require("glob");

var fs = require('fs')
var entryPath = './src'
var filesList = fs.readdirSync(entryPath).filter(function(file) {
    return file.match(/.*\.js$/);
});

    entries = {}

    console.log(filesList)

    filesList.forEach( f => {
      console.log(f)
      let entryName = path.basename(f,path.extname(f))
      entries[entryName] = path.join(__dirname, entryPath , f)
    })

module.exports = {
  devtool: 'eval',
  // mode: "development" || "production",
  // entry: [
  //   './src/index'
  // ],
  // output: {
  //   path: path.join(__dirname, 'dist'),
  //   filename: 'bundle.js',
  //   publicPath: '/public/javascripts/'
  // },
  // entry: {
  //   reactTest: "./src/index",
  //   reactTest: "./src/index",
  //   // b: "./b",
  //   // c: ["./c", "./d"]
  // },
  entry: entries,
  // entry: glob.sync("./src/*.js"),
  output: {
    path: path.join(__dirname, "public/javascripts"),
    filename: "[name].bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
    {
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/, use: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(gif|ttf|eot|svg|woff2?)$/,
      use: 'url-loader?name=[name].[ext]',
    },
    ]
  }
};
