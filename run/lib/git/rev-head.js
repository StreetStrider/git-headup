
var rev = require('./rev')

var value = require('ramda').always
var Null = value(null)

module.exports = function ()
{
	return rev('--short HEAD').catch(Null)
}
