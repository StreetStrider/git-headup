
var clc = require('cli-color')
var len = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud/hud')

module.exports = function ()
{
	var line = clc.bold(hud.pipe) + hud.space + clc.bold(process.cwd())

	var cols = process.stdout.columns

	if (len(line) > cols)
	{
		var prefix = clc.bold(hud.pipe + hud.space + hud.ell)
		var L = cols - len(prefix + hud.space)

		line = prefix + slice(line, -L)
	}

	return line
}
