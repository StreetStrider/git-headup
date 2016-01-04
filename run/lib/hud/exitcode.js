
var clc = require('cli-color')
var bold = clc.bold

var style = clc.bgRed.whiteBright

var hud = require('./hud-util')

module.exports = function ()
{
	var code = process.argv[2] || 0

	if (Number(code) !== 0)
	{
		return bold(hud.pipe) + hud.space + style(' = ' + code + hud.space)
	}
}
