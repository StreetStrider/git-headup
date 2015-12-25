
var value = require('ramda').always
var Null  = value(null)

var rev = require('./rev')

module.exports = function toplevel ()
{
	return rev('--show-toplevel').catch(Null)
}
