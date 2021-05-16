
var rev = require('./rev')

module.exports = function gitdir ()
{
	return rev('--git-dir')
}
