
var config = require('./git-config')

var R = require('ramda')
var unwrap = R.pipe(Number, R.defaultTo(7))

module.exports = function logDepth ()
{
	return config('git-headup.log-depth').then(unwrap)
}
