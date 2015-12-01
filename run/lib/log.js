
var git = require('./git/git')

module.exports = function log ()
{
	return git('log --graph', prettikey({ reldate: true, author: true }))
}


function prettikey (format)
{
	return "--pretty='" + pretty(format).join('') + "'"
}

var reset = '%C(reset)'

function pretty (format)
{
	var r = []

	r = r.concat([ '%C(red)','%h', reset ])
	r = r.concat([ '%C(auto)' , '%d', reset ])

	if (format.reldate)
	{
		r = r.concat(' ', [ '%C(magenta)','%ar', reset ])
	}
	if (format.author)
	{
		r = r.concat(' ', [ '%C(green)','%an', reset ])
	}

	r = r.concat(' ', [ '%C(auto)' , '%s' ])

	return r
}
