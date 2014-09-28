gutil = require 'gulp-util'
through = require 'through2'
jspath = require 'jspath'
_ = require 'underscore'

replace = (str)->
	obj = JSON.parse str
	results = jspath.apply '.widgetTree..plistFile',obj
	results = _.uniq results
	if _.isArray obj.textures
		obj.textures = results
	if _.isArray obj.texturesPng
		obj.texturesPng = results
	JSON.stringify obj

module.exports = ->
	through.obj (file,enc,cb)->
		cb null,file if file.isNull()

		if file.isStream()
			cb(new gutil.PluginError 'gulp-cocostudio-unusedtextures','Streaming not supported')
			return

		try
			file.contents = new Buffer(replace(file.contents.toString()))
			cb null,file
		catch err
			cb(new gutil.PluginError 'gulp-cocostudio-unusedtextures', err, {fileName: file.path})