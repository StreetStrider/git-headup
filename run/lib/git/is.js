
var value = require('ramda').always
var True = value(true)
var False = value(false)

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

function troo (v)
{
	return v === 'true'
}
