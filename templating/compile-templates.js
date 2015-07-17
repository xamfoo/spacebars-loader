/**
 * Copied from Meteor v1.1.0.2 and exports html_scanner
 * https://github.com/meteor/meteor/tree/release/METEOR%401.1.0.2/packages/templating/plugin
 */
// REMOVE {
// var path = Npm.require('path');
// }
// ADD {
var path = require('path');
// }

// REMOVE {
// var doHTMLScanning = function (compileStep, htmlScanner) {
//   // XXX the way we deal with encodings here is sloppy .. should get
//   // religion on that
//   var contents = compileStep.read().toString('utf8');
// }
var doHTMLScanning = function (contents, htmlScanner, options) {
  var inputPath = this.resourcePath;
  // ADD {
  options = options || {};
  // }
  try {
    // REMOVE {
    // var results = htmlScanner.scan(contents, compileStep.inputPath);
    // }
    var results = htmlScanner.scan(contents, inputPath, options);
  } catch (e) {
    if (e instanceof htmlScanner.ParseError) {
      // REMOVE {
      // compileStep.error({
      // }
      // ADD {
      console.log({
      // }
        message: e.message,
        // REMOVE {
        // sourcePath: compileStep.inputPath,
        // }
        sourcePath: inputPath,
        line: e.line
      });
      return;
    } else
      throw e;
  }

  // REMOVE {
  // if (results.head)
  //   compileStep.appendDocument({ section: "head", data: results.head });

  // if (results.body)
  //   compileStep.appendDocument({ section: "body", data: results.body });
  // }

  if (results.js) {
    // REMOVE {{{
    // var path_part = path.dirname(compileStep.inputPath);
    // if (path_part === '.')
    //   path_part = '';
    // if (path_part.length && path_part !== path.sep)
    //   path_part = path_part + path.sep;
    // var ext = path.extname(compileStep.inputPath);
    // var basename = path.basename(compileStep.inputPath, ext);

    // // XXX generate a source map

    // compileStep.addJavaScript({
    //   path: path.join(path_part, "template." + basename + ".js"),
    //   sourcePath: compileStep.inputPath,
    //   data: results.js
    // });
    // }}}
    // ADD {{{
    if (results.head) {
      results.js +=
        '\nmodule.exports.head = module.exports.head || "";\n' +
        'module.exports.head += "' + results.head + '";\n';
    }
    // }}}

    return results.js;
  }
  return ''; // Returns empty string if html is empty
};

// REMOVE {{{
// Plugin.registerSourceHandler(
//   "html", {isTemplate: true, archMatching: 'web'},
//   function (compileStep) {
//     doHTMLScanning(compileStep, html_scanner);
//   }
// );
// }}}
// ADD
module.exports = doHTMLScanning;
