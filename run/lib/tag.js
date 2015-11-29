
var run = require('command-promise')

module.exports = function t (args, cmd, argv)
{
	if (! argv.length)
	{
		return run('git tag -n')
	}
	else
	{
		return run('git tag', argv)
	}
}
