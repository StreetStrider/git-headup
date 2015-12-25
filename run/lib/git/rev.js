
var git = require('./git')

module.exports = function rev ()
{
	return git('rev-parse', arguments)
}
