
var clc   = require('cli-color')

var bold  = clc.bold

var len   = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud')

module.exports = function ()
{
	var line = bold(hud.pipe) + hud.space + bold(process.cwd())

	var cols = process.stdout.columns

	if (len(line) > cols)
	{
		var prefix = bold(hud.pipe + hud.space + hud.ell)
		var L = cols - len(prefix + hud.space)

		line = prefix + slice(line, -L)
	}

	return line
}
