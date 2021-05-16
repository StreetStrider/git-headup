
var clc   = require('cli-color')

var bold = clc.bold

var style__bare = clc.red.underline
var style__gitdir = clc.red.underline
var style__rebase = clc.bgRed.whiteBright
var style__branch = clc.green
var style__detached = clc.magenta
var style__rev = clc.red
var style__empty = clc.yellow

var style__author = clc.blue
var style__msg = clc.italic

var style__modified = clc.bgGreen.whiteBright
var style__staged = clc.bgYellow.whiteBright
var style__conflicted = clc.bgRed.whiteBright
var style__untracked = clc.blackBright
var style__shash = clc.blackBright

var style__ahead = clc.bgBlue.whiteBright
var style__behind = clc.bgWhite

var len   = clc.getStrippedLength
var slice = clc.slice

var hud = require('./hud-util')

var git = require('../git/git')
var is  = require('../git/is')
var head = require('../git/rev-head')
var branch = require('../git/branch')
var username = require('../git/username')
var loglast = require('../git/log-last')
var status = require('../git/status')
var stashes = require('../git/stashes')
var upstream = require('../git/upstream')


var maybe = require('../maybe')


module.exports = function ()
{
	return is.git()
	//.then(maybe(is.worktree))
	.then(maybe(output))
}

function output ()
{
	return Promise.all([
		head(),
		branch(),
		is.bare(),
		is.gitdir(),
		is.rebase(),
	])
	.then(function (_)
	{
		var head     = _[0]
		var branch   = _[1]
		var isBare   = _[2]
		var isGitdir = _[3]
		var isRebase = _[4]

		return Promise.resolve([])
		/* LEFT */
		.then(function (left)
		{
			left.push([ null, bold(hud.pipe) + hud.space + bold('git') ])

			if (isBare)
			{
				left.push([ null, hud.space + style__bare('bare') ])
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
					left.push([ null, hud.space + hud.bull + hud.space ])
				}
				else if (branch)
				{
					if (branch !== 'master')
					{
						left.push([ null, style__branch(branch) ])
						left.push([ null, hud.space + hud.bull + hud.space ])
					}
				}
				else
				{
					left.push([ null, style__detached(hud.brkt('HEAD')) ])
					left.push([ null, hud.space + hud.bull + hud.space ])
				}

				left.push([ null, style__rev(head) ])

				return Promise.all([
					username(),
					loglast.author(),
					loglast.msg()
				])
				.then(function (_)
				{
					var me = _[0]
					var author = _[1]
					var msg = _[2]

					left.push([ 'ext', hud.space + hud.bull + hud.space ])
					if (author !== me)
					{
						left.push([ 'ext', style__author(author) + ',' + hud.space ])
					}
					left.push([ 'ext', style__msg(msg) ])

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
			return Promise.all([
				status(),
				stashes(),
				upstream()
			])
			.then(function (_)
			{
				var status = _[0]
				var stashes = _[1]
				var revupstream = _[2]

				var right = []

				if (status || stashes || revupstream)
				{
					right.unshift([ 'right', hud.space ])
				}

				if (status)
				{
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

					if (status.modified || status.staged)
					{
						right.unshift([ 'right', hud.space ])
					}

					if (status.untracked)
					{
						right.unshift([ 'right', style__untracked(status.untracked + '?') ])
						right.unshift([ 'right', hud.space ])
					}
				}

				if (stashes)
				{
					right.unshift([ 'right', style__shash(hud.brkt(stashes)) ])
					right.unshift([ 'right', hud.space ])
				}

				if (revupstream)
				{
					return upstream.delta(revupstream)
					.then(function (delta)
					{
						if (delta[0] || delta[1])
						{
							right.unshift([ 'right', style__ahead(
								hud.space + delta[1] + hud.space + '→' + hud.space + hud.space
							) ])
							right.unshift([ 'right', style__behind(
								hud.space + '←' + hud.space + delta[0] + hud.space + revupstream + hud.space
							) ])
							right.unshift([ 'right', hud.space ])
						}

						return [ left, right ]
					})
				}
				else
				{
					return [ left, right ]
				}
			})
		})
		.then(function (seq)
		{
			var left  = seq[0]
			var right = seq[1]

			var L__left  = len(cat(left))
			var L__right = len(cat(right))
			var L = L__left + L__right

			var cols = process.stdout.columns

			if (L <= cols)
			{
				return gap(left, right, cols)
			}
			else
			{
				var leftmost = left.filter(byHeadNot('ext'))
				var leftext  = left.filter(byHead('ext'))

				var delta = cols - (len(cat(leftmost)) + L__right)

				if (delta >= 3)
				{
					leftext = cat(leftext)
					leftext = hud.ellipsed(delta, leftext)
					leftext = [ 'ext', leftext ]

					return leftmost.concat([ leftext ], right)
				}
				else
				{
					return gap(leftmost, right, cols)
				}
			}
		})
	})
	.then(cat)
	.then(hud.ellipsed(process.stdout.columns))
}


var R = require('ramda')

var nth = R.nth

function cat (seq)
{
	return seq.map(nth(1)).join('')
}

function gap (left, right, width)
{
	var what = hud.space

	var delta = width - (len(cat(left)) + len(cat(right)))

	if (delta > 0)
	{
		var spaces = [ 'space', what.repeat(delta) ]
		return left.concat([ spaces ], right)
	}

	return left.concat(right)
}


function byHead (head)
{
	return R.pipe(nth(0), R.equals(head))
}

function byHeadNot (head)
{
	return R.pipe(byHead(head), R.not)
}
