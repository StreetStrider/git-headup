
var npmroot = require('find-root')

var join = require('path').join
var fs = require('fs-sync')

var hud = require('./hud-util')
var clc = require('cli-color')
var bold = clc.bold

var style__name = clc.red
var style__private = clc.underline
var style__version = bold


module.exports = function npm ()
{
	try
	{
		var path = npmroot(process.cwd())
	}
	catch (e)
	{
		return
	}
	{
		return output(path)
	}
}

function output (path)
{
	var line = bold(hud.pipe) + hud.space + bold('npm') + hud.space + hud.bull + hud.space

	path = join(path, 'package.json')
	var manifest = fs.readJSON(path)

	line = line + style__name(manifest.name)

	if (manifest.private)
	{
		line = line + hud.space + style__private('private')
	}

	if (manifest.version)
	{
		line = line + hud.space + hud.brkt(style__version(manifest.version))
	}

	line = hud.ellipsed(process.stdout.columns, line)

	return line
}
