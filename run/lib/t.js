
var run = require('command-promise')

module.exports = function t (args, cmd, argv)
{
	if (! argv.length)
	{
		return run('git tag -n').then(console.dir)
	}
	else
	{
		console.warn(argv)
		return run('git tag', argv).then(console.dir)
	}
}
