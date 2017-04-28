var htmlStyleRegExp = /style=(['"])(.*?)(\1)/ig;
var htmlStylePairRegExp = /([\w-]+):(.*)/ig;

var capitalize = function(str) {
	return str.slice(0, 1).toUpperCase() + str.slice(1);
};

var toCamelCase = function(name) {
	return name.split('-').reduce( function(prev, cur, i) {
		return prev + capitalize(cur);
	});
};

module.exports = function(html) {
	return html.replace(htmlStyleRegExp, function(match, p1, p2, offset, str) {
		var stringPairs = p2.trim()
			.replace(/\s+?/ig, ' ')
			.replace(/\s*([:;,\(\)])\s*/ig, '$1')
			.split(';')
			.filter( function(str) {
				return str.length > 2;
			});

		var newStr ='';

		stringPairs.forEach( function(pair) {
			var obj = htmlStylePairRegExp.exec(pair);
			newStr = newStr.concat( toCamelCase(obj[1]), ':"', obj[2], '",');
			htmlStylePairRegExp.lastIndex = 0;
		});

		return 'style={{' + newStr + '}}';
	});
}
