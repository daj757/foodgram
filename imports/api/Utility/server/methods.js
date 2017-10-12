import { Meteor } from 'meteor/meteor';
var path = require("path");

import getPrivateFile from '../../../modules/server/get-private-file';
import parseMarkdown from '../../../modules/parse-markdown';
const PythonShell = require('python-shell');

Meteor.methods({
  'utility.getPage': function utilityGetPage(fileName) {
    check(fileName, String);
    return parseMarkdown(getPrivateFile(`pages/${fileName}.md`));
  },
  'utility.imageAI': function utilityImageAI(image) {

  	console.log("this is it ", path.join(__dirname, 'scrpt1.py'))
	  var options = {
    	args: ['squirtle.png']
}
	
	PythonShell.run(path.join(__dirname, 'script1.py'), options, function(err, results) {
            if (err) throw err;
            console.log(results[0], 'finished');
})
 }
});
