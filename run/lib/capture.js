
var ChildProcess = require('child_process').ChildProcess

var unpair = require('./unpair')

module.exports = function capture (result)
{
	return resolve(result)
	.then(function (result)
	{
		result = unpair(result)
		result = result && String(result)

		return result
	})
}

function resolve (result)
{
	if (result instanceof ChildProcess)
	{
		var child = result
		return new Promise(function (rs, rj)
		{
			child.once('error', rj)
			child.once('exit',  rj)
		})
	}
	else
	{
		return Promise.resolve(result)
	}
}
