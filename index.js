/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

var less = require('less');
var root = fis.project.getProjectPath();
var path = require('path');

module.exports = function(content, file, conf){

    conf.paths = [ path.resolve(file.dirname), root ];
    conf.filename = path.resolve(file.fullname);
    conf.syncImport = true;
    conf.relativeUrls = conf.relativeUrls !== false ? true : false;

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
