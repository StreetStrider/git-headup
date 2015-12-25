
var git = require('./git')

var last = module.exports = {}

last.author = function ()
{
	return git('log -1 --format=%an')
}

last.msg = function ()
{
	return git('log -1 --format=%s')
}
