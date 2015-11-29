
var git = require('./git/git')

module.exports = function log ()
{
	return git('log', "--pretty='%C(red)%h%C(reset) %C(cyan)%ar%C(reset) %C(green)%an%C(reset) %C(auto)%s%C(auto)%d'")
}
