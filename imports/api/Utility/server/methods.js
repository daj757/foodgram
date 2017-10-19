import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'
var path = require("path");
var exec = Npm.require('child_process').exec;
var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future');
var absolutePathToScript = process.argv[1];
var absolutePathToProject = path.resolve(absolutePathToScript, "../../../..")

import getPrivateFile from '../../../modules/server/get-private-file';
import parseMarkdown from '../../../modules/parse-markdown';
const PythonShell = require('python-shell');


Meteor.methods({
  'utility.getPage': function utilityGetPage(fileName) {
    check(fileName, String);
    return parseMarkdown(getPrivateFile(`pages/${fileName}.md`));
  },
  'utility.imageAI': function utilityImageAI(files) {
    // check(files, any)
    var pathToPyScript = path.resolve(absolutePathToProject, 'imports/api/Utility/server/');
  	console.log("this is it ", pathToPyScript)
    console.log(files)
	  var options = {
      scriptPath: pathToPyScript,
      args: files

    }
	
	PythonShell.run("tensor.py", options, function(err, results) {
            if (err) {
              console.log(err)
            }
            else{
            console.log(results[0], 'finished');
          }
})
  //   exec(path.join(__dirname, 'script1.py'), function (error, stdout, stderr) {
  //       if (error) {
  //   console.log(`exec error: ${error}`);
  //   return;
  // }
  // console.log(`stdout: ${stdout}`);
  // console.log(`stderr: ${stderr}`);

  // })
  
  }      
});
