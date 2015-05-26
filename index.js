/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var less = require('less');
var root = fis.project.getProjectPath();

module.exports = function(content, file, conf){

    conf.paths = [ file.dirname, root ];
    conf.syncImport = true;
    conf.relativeUrls = true;

    less.render(content, conf, function (err, result) {
        if (err) {
            throw err;
            return;
        }
        content = result.css;
        result.imports.forEach(function (path) {
            file.cache.addDeps(path);
        });
    });

  return content;
};
