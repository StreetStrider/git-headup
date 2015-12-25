
var clc   = require('cli-color')

var bold  = clc.bold
var red   = clc.red

var len   = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud')

var git = require('../git/git')
var is  = require('../git/is')
var head = require('../git/rev-head')
var branch = require('../git/branch')


var maybe = require('../maybe')


module.exports = function ()
{
	return is.git().then(maybe(output))
}

function output ()
{
	return Promise.all([
		head(),
		branch(),
		is.bare(),
		is.tree(),
		is.rebase()
	])
	.then(function (_)
	{
		console.log('| head: %s, branch: %s, bare: %s, tree: %s, rebase: %s', _[0], _[1], _[2], _[3], _[4])
	})

	.then(function (rev)
	{
		var line = bold(hud.pipe) + hud.space + bold('git')

		// + hud.space + red(rev)

		return line
	})
}
