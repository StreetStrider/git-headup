
var clc   = require('cli-color')

var bold  = clc.bold
var red   = clc.red

var len   = clc.getStrippedLength
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
		var line = bold(hud.pipe) + hud.space + bold('git') + hud.space + red(rev)

		return line
	})
}

// git symbolic-ref --short HEAD
