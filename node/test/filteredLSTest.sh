#!/bin/sh

echo testing for getting list of files with externsion specified in current directory
output=$(node filteredLS.js ./ js   )
if [ "$output" "==" 'test' ]; then
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
output=$(node filteredLS.js ./ )
if [ "$output" "==" 'Directory is empty' ]; then
    echo "\u2713 passed"
else
    echo "\u2717 failed"
fi

