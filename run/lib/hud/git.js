
var clc   = require('cli-color')

var bold = clc.bold
var red = clc.red
var green = clc.green
var magenta = clc.magenta

var style__rebase = clc.bgRed.whiteBright

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
		var head   = _[0]
		var branch = _[1]
		var isBare = _[2]
		var isTree = _[3]
		var isRebase = _[4]

		var line = bold(hud.pipe) + hud.space + bold('git')

		line = line + hud.space + hud.bull + hud.space

		if (head)
		{
			if (isRebase)
			{
				line = line + style__rebase(hud.brkt('REBASE'))
			}
			else if (branch)
			{
				line = line + green(branch)
			}
			else
			{
				line = line + magenta(hud.brkt('HEAD'))
			}

			line = line + hud.space + hud.bull + hud.space

			line = line + red(head)
		}
		else
		{
			line = line + magenta('before first commit')
		}

		//  
		console.log('| head: %s, branch: %s, bare: %s, tree: %s, rebase: %s', _[0], _[1], _[2], _[3], _[4])

		return line
	})
}
