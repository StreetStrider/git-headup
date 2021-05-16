
var toplevel = require('../git/toplevel')
var maybe = require('../maybe')
var relative = require('path').relative
var tildify = require('tildify')

var clc = require('cli-color')

var bold = clc.bold
var red  = clc.red

var len   = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud-util')

module.exports = function ()
{
	var cwd = process.cwd()

	return toplevel()
	.then(maybe(function (path)
	{
		var rel = relative(path, cwd)

		if (rel)
		{
			cwd = cwd.slice(0, - rel.length) + red(cwd.slice(- rel.length))
		}
	}))
	.then(function ()
	{
		return tildify(cwd)
	})
	.then(function (cwd)
	{
		var line = bold(hud.pipe) + hud.space + bold(cwd)

		var cols = process.stdout.columns

		if (len(line) > cols)
		{
			var prefix = bold(hud.pipe + hud.space + hud.ell)
			var L = cols - len(prefix + hud.space)

			line = prefix + slice(line, -L)
		}

		return line
	})
}
