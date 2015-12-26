
var run = require('command-promise')
var trimRight = require('ramda').invoker(0, 'trimRight')

module.exports = function git ()
{
	return run('git', arguments)
	.then(run.util.stdout)
	.then(trimRight)
}
