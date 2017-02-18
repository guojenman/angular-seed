const ENV_PRODUCTION = process.env.WEBPACK_ENV === 'production';

module.exports = config => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../src/app/',
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      './karma.entry.js',
      { pattern: '**/*.spec.ts', watched: true, included: false, served: true }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.*': ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.ts', '.js', '.json']
      },
      module: {
        rules: [
          { test: /\.ts$/, loaders: ['awesome-typescript-loader?configFileName=src/app/tsconfig.json', 'angular2-template-loader', 'preprocess-loader?ENV=dev', 'angular-router-loader'] },
          { test: /\.html$/, loaders: ['to-string-loader', 'preprocess-loader?ENV=dev'] },
          { test: /\.(css|scss)$/, loaders: ['to-string-loader', 'css-loader?importLoaders=1', 'postcss-loader?config=config/postcss.config.js'] },
        ]
      },
      stats: { colors: true, reasons: true },
    },

    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: ENV_PRODUCTION ? false : true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: ENV_PRODUCTION ? true : false
  });
};