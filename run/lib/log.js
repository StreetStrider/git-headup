
var git = require('./git/git')
var logDepth = require('./git/log-depth')

module.exports = function log (_, _, argv)
{
	var mode = argv[0]
	argv = argv.slice(1)

	return logDepth()
	.then(function (depth)
	{
		depth = '-' + depth

		switch (mode)
		{
			case 'l':
			return git('log', depth, prettikey({ reldate: true }), argv)

			case 'll':
			return git('log', depth, prettikey({ reldate: true, author: true }), argv)

			default:
			throw new Error('not all cases covered')
		}
	})

	//return git('log --graph', prettikey({ reldate: true, author: true }))
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
