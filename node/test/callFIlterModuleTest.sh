#!/bin/sh

echo testing for getting list of files with extension specified in current directory
output=$(node callFilterModule.js ./ js)
if [ "$output" "==" 'babsySteps.js
callFilterModule.js
filteredLS.js
filteredLSModule.js
firstAsyncIO.js
firstIO.js
helloWorld.js
httpClient.js' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for getting list of files with extension specified in some directory
output=$(node callFilterModule.js ~/labs/tuts/ md)
if [ "$output" "==" 'README.md' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for no extension passed
output=$(node callFilterModule.js ./ )
if [ "$output" "==" 'test' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for directory argument is not passed
output=$(node callFilterModule.js )
if [ "$output" "==" 'Directory input is invalid' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for extension file not in directory 
output=$(node callFilterModule.js ./ ms)
if [ "$output" "==" '' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for directory argument not present
output=$(node callFilterModule.js )
if [ "$output" "==" 'Directory input is invalid' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi



