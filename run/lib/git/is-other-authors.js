
var R = require('ramda')

var git = require('./git')
var config = require('./git-config')

var logDepth = require('./log-depth')

module.exports = function isOtherAuthors ()
{
	return config('user.name')
	.then(function (username)
	{
		if (! username)
		{
			return true /* may be other authors */
		}

		return logDepth()
		.then(function (depth)
		{

		if (! Number.isFinite(depth))
		{
			return true /* may be other authors */
		}

		return git('log', [ '-n', depth ], [ "--pretty='%an'" ])
		.then(R.nth(0))
		.then(R.split('\n'))
		.then(R.filter(Boolean))
		.then(R.reject(R.identical(username)))
		.then(function (_)
		{
			return !! _.length
		})

		})
	})
}
