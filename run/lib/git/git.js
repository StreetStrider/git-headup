
var run = require('command-promise')

module.exports = function git ()
{
	return run('git', arguments)
}
