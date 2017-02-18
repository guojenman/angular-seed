var path = require('path');
module.exports = function (context) {
  var plugins = [
    require('postcss-smart-import')({ path: 'src/css' }),
    require('postcss-advanced-variables')(),
    require('postcss-nested')(),
    require('postcss-calc')(),
    require('autoprefixer')()
  ];
  if (context.env !== 'development') {
    plugins.push(require('cssnano')({ zindex: false }));
  }
  return {
    plugins: plugins
  };
}