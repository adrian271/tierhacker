#!/usr/bin/bash

rm -rf build
mkdir build
cp manifest.json build 
cp content.js build 
cp tierhacker.css build 
cp Tierhacker_128.png build 
cp Tierhacker_16.png build 
cp Tierhacker_48.png build
zip -r build.zip build
rm -rf build