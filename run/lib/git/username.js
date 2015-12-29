
var git = require('./git')

module.exports = function ()
{
	return git('config --get user.name')
}
