
var hud = module.exports = {}

// hud.pipe  = '|'
hud.pipe  = '┃'
hud.space = ' '
hud.nl    = '\n'
hud.ell   = '…'
hud.bull  = '•'

hud.brkt = function (string)
{
	return '⟨' + string + '⟩'
}


var len = require('cli-color').getStrippedLength
var slice = require('cli-color').slice
var curry = require('ramda').curry

hud.ellipsed = curry(function (width, string)
{
	if (len(string) > width)
	{
		string = slice(string, 0, width - 2)
		string = string + hud.ell + hud.space
	}

	return string
})


var write = hud.write = function (string)
{
	process.stdout.write(string, 'utf-8')
}

hud.writeln = function (string)
{
	write(string + hud.nl)
}


var maybe = require('../maybe')

hud.writeseq = function writeseq (seq, promise)
{
	promise || (promise = Promise.resolve())

	if (seq.length)
	{
		var head = seq[0]
		    seq  = seq.slice(1)

		promise = promise.then(head).then(maybe(hud.writeln))

		return writeseq(seq, promise)
	}
	else
	{
		return promise.catch(console.error)
	}
}
