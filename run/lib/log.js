
var git = require('./git/git')

var reset = '%C(reset)'

var pretty =
[
	'--pretty',
	'=',
	"'",
	'%C(red)',   '%h', reset,
	' ',
	'%C(cyan)',  '%ar', reset,
	' ',
	'%C(green)', '%an', reset,
	' ',
	'%C(auto)' , '%s',
	'%C(auto)' , '%d',
	"'"
]
.join('')

module.exports = function log ()
{
	return git('log', pretty)
}
