var loaderUtils = require("loader-utils");
var html_scanner = require('./templating/html_scanner.js');
var doHTMLScanning = require('./templating/compile-templates.js');

module.exports = function(source, sourceMap) {
  if (this.cacheable) this.cacheable();

  var options = loaderUtils.parseQuery(this.query);
  return doHTMLScanning.call(this, source, html_scanner, options);
};
