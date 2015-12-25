
var join = require('path').join

var value = require('ramda').always
var True  = value(true)
var False = value(false)

var run = require('command-promise')
var git = require('./git')


var is = module.exports = {}

function rev ()
{
	return git('rev-parse', arguments)
}


is.git = function ()
{
	return rev().then(True, False)
}

is.bare = function ()
{
	return rev('--is-bare-repository').then(troo)
}

is.tree = function ()
{
	return rev('--is-inside-work-tree').then(troo)
}

is.rebase = function ()
{
	return rev('--show-toplevel')
	.then(function (path)
	{
		path = join(path, '.git/rebase-merge')

		return run('file', path).then(True, False)
	})
}

function troo (v)
{
	return v === 'true'
}
