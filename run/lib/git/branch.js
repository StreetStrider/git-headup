
var git = require('./git')

module.exports = function branch ()
{
	return git('symbolic-ref --short HEAD')
}
