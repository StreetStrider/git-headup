
var run = require('command-promise')

module.exports = function git ()
{
	return run('git', arguments)
	.then(run.util.stdout)
	.then(run.util.trim)
}
