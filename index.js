var html_scanner = require('./templating/html_scanner.js');
var doHTMLScanning = require('./templating/compile-templates.js');

module.exports = function(source) {
  return doHTMLScanning.call(this, source, html_scanner);
};
