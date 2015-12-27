
var git = require('./git')

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
	})
}
