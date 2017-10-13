import React from 'react';
import {Button} from 'react-bootstrap';
import './Index.scss';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {Meteor} from 'meteor/meteor';

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

  onImageDrop() {

    //    Meteor.call('utility.imageAI', files[0],(err, res) => {
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log(res)
    // }
    //  this.handleImageUpload(files[0]);
    Template.Profile.events({
      'change .myFileInput': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
          Images.insert(file, function(err, fileObj) {
            if (err) {
              // handle error
            } else {
              // handle success depending what you need to do
              var userId = Meteor.userId();
              var imagesURL = {
                "profile.image": " / cfs / files / images / " + fileObj._id
              };
              Meteor.users.update(userId, {$set: imagesURL});
            }
          });
        });
      }
    });

  }

  // const imageResponsiveInstance = (
  //   <Image src="/assets/thumbnail.png" responsive />
  // );

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
      <div id="main" className="Index">
          <input onChange={this.onImageDrop} type="file" name="…" className="myFileInput"/>
      </div>
    )
  }
}

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
