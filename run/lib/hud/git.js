
var clc   = require('cli-color')

var bold = clc.bold

var style__bare = clc.red.underline
var style__gitdir = clc.red.underline
var style__rebase = clc.bgRed.whiteBright
var style__branch = clc.green
var style__detached = clc.magenta
var style__rev = clc.red
var style__empty = clc.yellow

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
		is.gitdir(),
		is.rebase()
	])
	.then(function (_)
	{
		var head   = _[0]
		var branch = _[1]
		var isBare = _[2]
		var isTree = _[3]
		var isGitdir = _[4]
		var isRebase = _[5]

		var line = bold(hud.pipe) + hud.space + bold('git')

		if (isBare)
		{
			line = line + hud.space + style__bare('bare')
		}
		else if (isGitdir)
		{
			line = line + hud.space + style__gitdir('.git')
		}


		line = line + hud.space + hud.bull + hud.space

		if (head)
		{
			if (isRebase)
			{
				line = line + style__rebase(hud.brkt('REBASE'))
			}
			else if (branch)
			{
				line = line + style__branch(branch)
			}
			else
			{
				line = line + style__detached(hud.brkt('HEAD'))
			}

			line = line + hud.space + hud.bull + hud.space

			line = line + style__rev(head)
		}
		else
		{
			line = line + style__empty('before first commit')
		}

		//  
		console.log('| head: %s, branch: %s, bare: %s, tree: %s, rebase: %s', _[0], _[1], _[2], _[3], _[4])

		return line
	})
}
