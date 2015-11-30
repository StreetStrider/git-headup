
var config = require('./config')

var byDefault = require('ramda').defaultTo(7)

module.exports = function logDepth ()
{
	return config('git-headup.log-depth')
	.then(Number)
	.then(byDefault)
}
