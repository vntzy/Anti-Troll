browserify -r ./naive_bayes.js:bayes -o bayes_web.js
copy /A .\bayes_web.js ..\src\common\dependencies\bayes_web.js