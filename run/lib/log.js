
var spawn = require('child_process').spawn

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

		console.log(depth)

		switch (mode)
		{
			case 'l':
			spawn('git', [ 'log', depth, prettikey({ reldate: true }) ].concat(argv), { stdio: 'inherit' })
			return null

			case 'll':
			spawn('git', [ 'log', depth, prettikey({ reldate: true, author: true }) ].concat(argv), { stdio: 'inherit' })
			return null

			case 'g':
			spawn('git', [ 'log', '--graph', prettikey({ reldate: true, author: true }) ].concat(argv), { stdio: 'inherit' })
			return null

			default:
			throw new Error('not all cases covered')
		}
	})
}


function prettikey (format)
{
	return "--pretty=" + pretty(format).join('')
}

var reset = '%C(reset)'

function pretty (format)
{
	var r = []

	r = r.concat([ '%C(red)','%h', reset ])
	r = r.concat([ '%C(auto)' , '%d', reset ])

	if (format.author)
	{
		r = r.concat(' ', [ '%C(blue)','%an', reset ])
	}
	if (format.reldate)
	{
		r = r.concat(' ', [ '%C(green)', '[','%ar', ']', reset ])
	}

	r = r.concat(' ', [ '%C(auto)' , '%s' ])

	return r
}
