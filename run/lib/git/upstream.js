
var value = require('ramda').always
var Null = value(null)

var git = require('./git')
var rev = require('./rev')

var upstream = module.exports = function upstream ()
{
	return rev('--abbrev-ref HEAD@{upstream}').catch(Null)
}

upstream.delta = function (revupstream)
{
	return Promise.all([ count('HEAD', revupstream), count(revupstream, 'HEAD') ])
	.then(function (_)
	{
		return _
	})
}

function count (reva, revb)
{
	var revdelta = reva + '..' + revb
	return git('log --format=%h', revdelta)
	.then(function (log)
	{
		if (! log)
		{
			return 0
		}
		else
		{
			log = log.split('\n')
			log = log.length
			return log
		}
	})
}
