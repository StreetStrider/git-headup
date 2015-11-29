
var git = require('./git')

var R = require('ramda')
var unwrap = R.pipe(R.nth(0), R.trim)

module.exports = function config (key)
{
	return git('config', '--get', key)
	.then(unwrap)
}
