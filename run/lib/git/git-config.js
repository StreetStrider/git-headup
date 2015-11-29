
var git = require('./git')

module.exports = function config (key)
{
	return git('config', '--get', 'git-headup.' + key)
}
