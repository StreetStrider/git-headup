
module.exports = function unpair (result)
{
	if (isPair(result))
	{
		return result[0]
	}

	return result
}

function isPair (result)
{
	if (! Array.isArray(result)) return false

	/* such weak*/
	if (result.length !== 2) return false

	/* much weak*/
	if (typeof result[0] !== 'string') return false
	if (typeof result[1] !== 'string') return false

	/* wow */
	return true
}
