
var git = require('./git')

module.exports = function ()
{
	return git('rev-parse --is-inside-work-tree')
	.then(troo)
}

function troo (v)
{
	return v === 'true'
}
