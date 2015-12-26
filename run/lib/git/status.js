
var R = require('ramda')

var git = require('./git')

module.exports = function status ()
{
	return git('status --short')
	.then(function (status)
	{
		var modified = 0
		var staged = 0
		var untracked = 0
		var conflicted = 0

		if (status)
		{
			status = status.split('\n')

			modified   = status.filter(isModified).length
			staged     = status.filter(isStaged).length
			untracked  = status.filter(isUntracked).length
			conflicted = status.filter(isConflicted).length
		}

		return { modified, staged, untracked, conflicted }
	})
}

var normals = 'MADRC'.split('')

var isNormal = R.contains(R.__, normals)

var isStaged   = R.pipe(R.nth(0), isNormal)
var isModified = R.pipe(R.nth(1), isNormal)

var isUntracked = R.pipe(R.nth(0), R.equals('?'))

var isConflicted = R.anyPass([ R.pipe(R.nth(0), R.equals('U')), R.pipe(R.nth(1), R.equals('U')) ])
