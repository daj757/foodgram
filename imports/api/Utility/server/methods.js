import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import getPrivateFile from '../../../modules/server/get-private-file';
import parseMarkdown from '../../../modules/parse-markdown';
const PythonShell = require('python-shell');

Meteor.methods({
  'utility.getPage': function utilityGetPage(fileName) {
    check(fileName, String);
    return parseMarkdown(getPrivateFile(`pages/${fileName}.md`));
  },
  'utility.imageAI': function utilityImageAI(image) {
  	console.log(image)
	var options = {
    	args: [image]
}
	
	PythonShell.run('tensor.py', options, function(err, results) {
            if (err) throw err;
            console.log(results[0], 'finished');
})
 }
});
