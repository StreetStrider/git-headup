
var clc = require('cli-color')
var bold = clc.bold

var pipe = require('ramda').pipe
var style = pipe(clc.bgRed, clc.whiteBright)

var hud = require('./hud')

module.exports = function ()
{
	var code = process.argv[2]

	if (Number(code) !== 0)
	{
		return bold(hud.pipe) + hud.space + style(' = ' + code + hud.space)
	}
}
