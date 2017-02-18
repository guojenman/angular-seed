var gulp = require('gulp');
var fs = require('fs-extra');
var execSync = require('child_process').execSync;
var ngTemplates = require('gulp-inline-ng2-template');
var pcssImport = require('postcss-smart-import');
var pcssVars = require('postcss-advanced-variables');
var pcssNested = require('postcss-nested');
var pcssPrefixer = require('autoprefixer');
var pcssNano = require('cssnano');
var pcssCalc = require('postcss-calc');
var postcss = require('postcss')()
  .use(pcssImport({
    path: 'src/css/'
  }))
  .use(pcssVars)
  .use(pcssNested)
  .use(pcssCalc)
  .use(pcssPrefixer)
  .use(pcssNano({ zindex: false }));

fs.emptyDirSync('_aot');
return Promise.resolve()
  .then(function () {
    gulp
      .src(['src/app/**/*.ts'])
      .pipe(ngTemplates({
        base: './',
        useRelativePaths: true,
        removeLineBreaks: true,
        styleProcessor: function (path, ext, file, cb) {
          postcss
            .process(file)
            .then(function (result) {
              cb(null, result.css);
            });
        }
      }))
      .pipe(gulp.dest('_aot/app'))
      .on('end', function () {
        execSync('npm run lint', { stdio: 'inherit' });
        fs.copySync('src/app/tsconfig-aot.json', '_aot/app/tsconfig.json');
        execSync('./node_modules/.bin/ngc -p _aot/app/', { stdio: 'inherit' });
        execSync('./node_modules/.bin/webpack --env.ENV=prod --config config/webpack.config.js  --hide-modules', { stdio: 'inherit' });
      });
  })