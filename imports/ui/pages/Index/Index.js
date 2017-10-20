import React from 'react';
import {Button} from 'react-bootstrap';
import './Index.scss';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {Meteor} from 'meteor/meteor';
import Images from '/imports/api/Documents/Images';
import GridView from '../../components/Grid/Grid';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      uploadedFile: null,
      distanceRating: 0,
      location: "",
      name: ""
    };
  }
  onImageDrop(files) {
    S3.upload({
      files:files,
      path:"subfolder"
    },
    function(e,r) {
      if(e){
        console.log(e)
      } else {
        console.log(r);
      }
    });
    Meteor.call('utility.imageAI',(err, res) => {
      if (err) {
        console.log(err);
      } else {
      console.log(res)
      }
    })
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({uploadedFileCloudinaryUrl: response.body.secure_url});
      }
    });
  }
  render() {
    return (
      <div id= "main" className="Index">
        <div>
          <h1>Goola</h1>
          <p>An Instagram for food lovers</p>
          <form>
            <Dropzone
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </form>
        </div>
        <GridView>
          
        </GridView>
      </div>    
    )
  }
}


// _.each(files, function(file) {
            // file.owner = Meteor.userId();
            // FS.Utility.eachFile(event, function(file) {
        //before upload also save the owner of that file
            // Images.insert(file, function(err, fileObj) {
            //     if (err) {
            //         console.log(err, fileObj); //in case there is an error, log it to the console
            //     } else {
            //       console.log("Success image loaded")
            //         //the image upload is done successfully.
            //         //you can use this callback to add the id of your file into another collection
            //         //for this you can use fileObj._id to get the id of the file
            //     }
            //   });
             // });
        // });
//      Template.myForm.events({
//   'change .myFileInput': function(event, template) {
//     FS.Utility.eachFile(event, function(file) {
//       Images.insert(file, function (err, fileObj) {
//         // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
//       });
//     });
//   }
// });


//   //  this.handleImageUpload(files[0]);
  // })

// const imageResponsiveInstance = (
  //   <Image src="/assets/thumbnail.png" responsive />
  // );





// import React from 'react';
// import { Button } from 'react-bootstrap';
// import './Index.scss';
// import Dropzone from 'react-dropzone';
// import request from 'superagent';
// import 'react-images-uploader/styles.css';
// import 'react-images-uploader/font.css';
// import { Meteor } from 'meteor/meteor';
//
// const CLOUDINARY_UPLOAD_PRESET = 'vptraviu';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dlr2ctpa7/upload';
//
// const loader1 = () => (
//   <div class="mult3">
//       <div class="mult3circle1"></div>
//       <div class="mult3circle2"></div>
//    </div>
//   )
// export default class Index extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       uploadedFile: null,
//       uploadedFileCloudinaryUrl: ''
//     };
//   }
//
//   onImageDrop(files) {
//     this.setState({
//       uploadedFile: files[0]
//     });
//      Meteor.call('utility.imageAI', files[0],(err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res)
//   }
//    // this.handleImageUpload(files[0]);
// });
//
//
//   }
//
//   handleImageUpload(file) {
//     let upload = request.post(CLOUDINARY_UPLOAD_URL)
//                      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
//                      .field('file', file);
//
//     upload.end((err, response) => {
//       if (err) {
//         console.error(err);
//       }
//
//       if (response.body.secure_url !== '') {
//         this.setState({
//           uploadedFileCloudinaryUrl: response.body.secure_url
//         });
//       }
//     });
//   }
// render() {
//   return (
//   <div id= "main" className="Index">
//
//     <h1>Goola</h1>
//     <p>An Instagram for food lovers</p>
//     <form>
//        <Dropzone
//       multiple={false}
//       accept="image/*"
//       onDrop={this.onImageDrop.bind(this)}>
//       <p>Drop an image or click to select a file to upload.</p>
//     </Dropzone>
//      <div>
//         {this.state.uploadedFileCloudinaryUrl === '' ? null :
//         <div>
//           <p>{this.state.uploadedFile.name}</p>
//           <img src={this.state.uploadedFileCloudinaryUrl} />
//         </div>}
//       </div>
//       </form>
//     <footer>
//       <p>Test it out. Upload a food image and let us classify it for you.</p>
//     </footer>
//   </div>
//   )
// }
// }
//
//
//
//
//
//
