
module.exports = function maybe (fn)
{
	return function (v)
	{
		return v && fn(v)
	}
}
