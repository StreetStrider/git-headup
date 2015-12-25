
var clc = require('cli-color')
var len = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud')

var git = require('../git/git')
var is  = require('../git/is')

var maybe = require('../maybe')


module.exports = function ()
{
	return is.git().then(maybe(print))
}

function print ()
{
	return git('rev-parse --short HEAD')
	.then(function (rev)
	{
		var line = clc.bold(hud.pipe) + hud.space + clc.bold('git') + hud.space + clc.red(rev)

		return line
	})
}

// git symbolic-ref --short HEAD
