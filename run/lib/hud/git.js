
var clc   = require('cli-color')

var bold = clc.bold

var style__bare = clc.red.underline
var style__gitdir = clc.red.underline
var style__rebase = clc.bgRed.whiteBright
var style__branch = clc.green
var style__detached = clc.magenta
var style__rev = clc.red
var style__empty = clc.yellow

var style__modified = clc.bgGreen.whiteBright
var style__staged = clc.bgYellow.whiteBright
var style__conflicted = clc.bgRed.whiteBright

var style__author = clc.blue
var style__msg = clc.italic

var len   = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud')

var git = require('../git/git')
var is  = require('../git/is')
var head = require('../git/rev-head')
var branch = require('../git/branch')
var loglast = require('../git/log-last')
var status = require('../git/status')


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

		return Promise.resolve([])
		/* LEFT */
		.then(function (left)
		{
			left.push([ null, bold(hud.pipe) + hud.space + bold('git') ])

			if (isBare)
			{
				left.push([ null, line + hud.space + style__bare('bare') ])
			}
			else if (isGitdir)
			{
				left.push([ hud.space + style__gitdir('.git') ])
			}

			left.push([ null, hud.space + hud.bull + hud.space ])

			if (head)
			{
				if (isRebase)
				{
					left.push([ null, style__rebase(hud.brkt('REBASE')) ])
				}
				else if (branch)
				{
					left.push([ null, style__branch(branch) ])
				}
				else
				{
					left.push([ null, style__detached(hud.brkt('HEAD')) ])
				}

				left.push([ null, hud.space + hud.bull + hud.space ])

				left.push([ null, style__rev(head) ])

				return Promise.all([
					loglast.author(),
					loglast.msg()
				])
				.then(function (_)
				{
					var author = _[0]
					var msg = _[1]

					left.push([ 'ext', hud.space + hud.bull + hud.space ])

					left.push([ 'ext', style__author(author) + ',' + hud.space + style__msg(msg) ])

					return left
				})
			}
			else
			{
				left.push([ null, style__empty('before first commit') ])

				return left
			}
		})
		/* RIGHT */
		.then(function (left)
		{
			return status()
			.then(function (status)
			{
				var right = []

				console.log(hud.pipe, status)

				if (status.conflicted)
				{
					right.unshift([ 'right', style__conflicted(hud.space + status.conflicted + hud.space) ])
					right.unshift([ 'right', hud.space ])
				}
				if (status.modified)
				{
					right.unshift([ 'right', style__modified(hud.space + status.modified + hud.space) ])
				}
				if (status.staged)
				{
					right.unshift([ 'right', style__staged(hud.space + status.staged + hud.space) ])
				}

				return [ left, right ]
			})
		})
		.then(function (seq)
		{
			var left  = seq[0]
			var right = seq[1]

			var L = len(cat(left)) + len(cat(right))
			var cols = process.stdout.columns

			var spaces = [ 'space', '' ]
			if (L < cols)
			{
				spaces = [ 'space', clc.green('~'.repeat(cols - L)) ]
			}

			return left.concat([ spaces ], right)
		})
	})
	.then(cat)
	.then(function (line)
	{
		var cols = process.stdout.columns

		if (len(line) > cols)
		{
			line = slice(line, 0, cols - 3)
			line = line + hud.ell + hud.space
		}

		return line
	})
}


var nth = require('ramda').nth

function cat (seq)
{
	return seq.map(nth(1)).join('')
}
