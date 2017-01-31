#!/bin/sh

echo testing for getting list of files with externsion specified in current directory
output=$(node filteredLS.js ./ js   )
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

echo testing for no externsion passed
output=$(node filteredLS.js ./ )
if [ "$output" "==" 'test' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for directory argument is not passed
output=$(node filteredLS.js )
if [ "$output" "==" 'test' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

echo testing for extension file not in directory 
output=$(node filteredLS.js ./ )
if [ "$output" "==" 'test' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

