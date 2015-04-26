var bayes = require('bayes');
var fs = require('fs');
var assert = require('assert');

var classifier = bayes();

var readline = require('readline');

var rl = readline.createInterface(process.stdin, process.stdout);

var stateJsonString = fs.readFileSync("./classifierState.json", "utf8");
var stateJson = JSON.parse(stateJsonString);
assert(stateJson);
var revivedClassifier = bayes.fromJson(stateJsonString);
assert(revivedClassifier);

rl.setPrompt('classify> ');
rl.prompt();
rl.on('line', function(line) {
    var result = revivedClassifier.categorize(line);
    console.log(result);
    rl.prompt();
}).on('close',function(){
    process.exit(0);
});