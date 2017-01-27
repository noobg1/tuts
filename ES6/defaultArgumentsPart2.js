function repeatExclamation(inputString, repeatNum = `${inputString.length}`)
{
  return `${inputString}${'!'.repeat(repeatNum)}`
}

module.exports = repeatExclamation;
