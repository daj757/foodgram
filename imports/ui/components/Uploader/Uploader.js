
import React from 'react';
import { Button } from 'react-bootstrap';
import './Index.scss';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { Meteor } from 'meteor/meteor';


export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
     Meteor.call('utility.imageAI', files[0],(err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res)
  }
   // this.handleImageUpload(files[0]);
});


  }

  const imageResponsiveInstance = (
    <Image src="/assets/thumbnail.png" responsive />
  );

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                     .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }
render() {
  return (
  <div id= "main" className="Index">
    <form>
       <Dropzone
      multiple={false}
      accept="image/*"
      onDrop={this.onImageDrop.bind(this)}>
      <p>Drop an image or click to select a file to upload.</p>
    </Dropzone>
      </form>
  </div>
  )
}
}
