
var R = require('ramda')
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

		switch (mode)
		{
			case 'l':
			logspawn(depth, prettikey({ reldate: true }), argv)
			return null

			case 'll':
			logspawn(depth, prettikey({ reldate: true, author: true }), argv)
			return null

			case 'g':
			logspawn('--graph', prettikey({ reldate: true, author: true }), argv)
			return null

			default:
			throw new Error('not all cases covered')
		}
	})
}


function logspawn ()
{
	var args = R.slice(0, -1, arguments)
	var argv = R.last(arguments) || []

	args = [ 'log' ].concat(args, argv)

	return spawn('git', args, { stdio: 'inherit' })
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
