
var git = require('./git')
var toStdout = require('command-promise').util.stdout

module.exports = function config (key)
{
	return git('config', '--get', 'git-headup.' + key).then(toStdout)
}
