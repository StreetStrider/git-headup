
var run = require('command-promise')
var toStdout = run.util.stdout

module.exports = function t (args, cmd, argv)
{
	if (! argv.length)
	{
		return run('git tag -n').then(toStdout)
	}
	else
	{
		return run('git tag', argv).then(toStdout)
	}
}
