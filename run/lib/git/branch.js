
var git = require('./git')

var value = require('ramda').always
var Null = value(null)

module.exports = function branch ()
{
	return git('symbolic-ref --short HEAD').catch(Null)
}
