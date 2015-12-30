
var git = require('./git')
var Null  = require('ramda').always(null)

module.exports = function ()
{
	return git('stash list')
	.then(function (stashes)
	{
		if (! stashes)
		{
			return 0
		}
		else
		{
			return stashes.split('\n').length
		}
	}
	, Null)
}
