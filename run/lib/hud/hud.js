
var hud = module.exports = {}

hud.pipe  = '|'
hud.space = ' '
hud.nl    = '\n'
hud.ell   = '…'
hud.bull  = '•'

var write = hud.write = function (string)
{
	process.stdout.write(string, 'utf-8')
}

hud.writeln = function (string)
{
	write(string + hud.nl)
}
