
var R = require('ramda')

var git = require('./git')
var config = require('./git-config')

module.exports = function isOtherAuthors ()
{
	return config('user.name')
	.then(function (username)
	{
		if (! username)
		{
			return true /* may be other authors */
		}

		return config('git-headup.log-depth')
		.then(Number)
		.then(function (depth)
		{

		if (! depth)
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
