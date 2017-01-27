
var fs = require('fs-extra');
var path = require('path');


function getFoldersWithMain(isAOT) {
  var pwd = path.join(__dirname, '..', 'src', 'js');
  return fs.readdirSync(pwd).filter(function (name) {
    return name[0] != '.'
      && fs.statSync(path.join(pwd, name)).isDirectory()
      && fs.existsSync(path.join(pwd, name, 'main' + (isAOT ? '.aot' : '') + '.ts'));
  });
}


/**
 * Concat files
 */
function concat(src, dest) {
  var FILE_ENCODING = 'utf-8';
  var out = src.map(function (filePath) {
    var content = fs.readFileSync(filePath, FILE_ENCODING).replace(/\/\/# sourceMappingURL=.+\.js\.map/, '');
    return content;
  });
  fs.outputFileSync(dest, '\n' + out.join('\n') + '\n', {encoding: FILE_ENCODING, clobber: true});
}

/**
 * Recursively find files which passes the regex test
 */
function collectFilesWithPattern(cwd, regex) {
  var results = [];
  fs.readdirSync(cwd)
    .forEach(function (name) {
      var pathname = path.join(cwd, name);
      if (name[0] !== '.' && fs.statSync(pathname).isDirectory()) {
        results = results.concat(collectFilesWithPattern(pathname, regex));
      } else if (regex.test(name)) {
        results.push(pathname);
      }
    });
  return results;
}


module.exports = {
  getFoldersWithMain: getFoldersWithMain,
  collectFilesWithPattern: collectFilesWithPattern,
  concat: concat
};