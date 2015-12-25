
var rev = require('./rev')

module.exports = function ()
{
	return rev('--short HEAD')
}
