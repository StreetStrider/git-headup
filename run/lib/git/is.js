
var join = require('path').join

var value = require('ramda').always
var True  = value(true)
var False = value(false)

var rev = require('./rev')
var gitdir = require('./gitdir')
var exists = require('fs-sync').exists


var is = module.exports = {}

is.git = function ()
{
	return rev().then(True, False)
}

is.bare = function ()
{
	return rev('--is-bare-repository').then(troo)
}

is.gitdir = function ()
{
	return rev('--is-inside-git-dir').then(troo)
}

is.worktree = function ()
{
	return rev('--is-inside-work-tree').then(troo)
}

is.rebase = function ()
{
	return gitdir()
	.then(function (path)
	{
		path = join(path, 'rebase-merge')

		return exists(path)
	})
}

function troo (v)
{
	return (v === 'true')
}
