#!/bin/sh
/Users/arupadhyaya/projects/ngx-gallery-master/node_modules/gulp/bin/gulp.js build
rm -rf ../medcords-app/node_modules/ngx-gallery/* 
cp -R ./dist/ ../medcords-app/node_modules/ngx-gallery/ 

