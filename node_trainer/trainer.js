var bayes = require('bayes');
var fs = require('fs');
var assert = require('assert');

var classifier = bayes();

/*
example data format:
[{"body":"Хуйло изпраща само звлени човечета","rating":2}]
*/

console.log("Importing learning data");
var inputData = JSON.parse(fs.readFileSync("./training_set.json", "utf8"));

console.log("Learning data size: " + inputData.length);

for(var i = 0; i < inputData.length; i++) {
    var elem = inputData[i];
    //console.log(elem.body);
    //console.log(elem.rating);
    classifier.learn(elem.body, elem.rating.toString());
}

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson();
fs.writeFileSync("./classifierState.json", stateJson);

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson);
assert(revivedClassifier);
