// Generated by CoffeeScript 1.8.0
(function() {
  var gutil, jspath, replace, through, _;

  gutil = require('gulp-util');

  through = require('through2');

  jspath = require('jspath');

  _ = require('underscore');

  replace = function(str) {
    var obj, results;
    obj = JSON.parse(str);
    results = jspath.apply('.widgetTree..plistFile', obj);
    results = _.uniq(results);
    if (_.isArray(obj.textures)) {
      obj.textures = results;
    }
    if (_.isArray(obj.texturesPng)) {
      obj.texturesPng = results;
    }
    return JSON.stringify(obj);
  };

  module.exports = function() {
    return through.obj(function(file, enc, cb) {
      var err;
      if (file.isNull()) {
        cb(null, file);
      }
      if (file.isStream()) {
        cb(new gutil.PluginError('gulp-cocostudio-unusedtextures', 'Streaming not supported'));
        return;
      }
      try {
        file.contents = new Buffer(replace(file.contents.toString()));
        return cb(null, file);
      } catch (_error) {
        err = _error;
        return cb(new gutil.PluginError('gulp-cocostudio-unusedtextures', err, {
          fileName: file.path
        }));
      }
    });
  };

}).call(this);
