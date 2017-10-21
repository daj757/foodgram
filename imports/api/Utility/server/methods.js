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

//["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpg", "40.jpg", "41.jpg", "42.jpg", "43.jpg", "44.jpg", "45.jpg", "46.jpg", "47.jpg", "48.jpg", "49.jpg", "50.jpg", "51.jpg", "52.jpg", "53.jpg", "54.jpg", "55.jpg", "56.jpg", "57.jpg", "58.jpg", "59.jpg", "60.jpg", "61.jpg", "62.png"]

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
      scriptPath: pathToPyScript
      args: files

    }


	PythonShell.run("tensor.py", options, function(err, results) {

            if (err) {
              console.log(err)
            }
            else {
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
