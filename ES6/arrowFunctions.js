var inputs = process.argv.slice(2);
var result = inputs.map( (input) => { return input[0]} )
var finalResult = result.reduce( (resultString, inpu) => {return resultString + inpu}, '');

console.log('[' + inputs + ']'+ ' becomes ' + '\"' +finalResult + '\"');
