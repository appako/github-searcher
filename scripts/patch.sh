#!/bin/bash

sed -i.bak '/\.\/esm5\/index.js/d' node_modules/typedi/package.json; sed -i.bak '/\.\/esm2015\/index.js/d' node_modules/typedi/package.json