
import React from 'react';
import {Button} from 'react-bootstrap';
import './Uploader.scss';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import {Meteor} from 'meteor/meteor';
import Images from '/imports/api/Documents/Images';
import PlacesAutocomplete from '../../pages/PlacesAutocomplete/Demo';
import Map from '../../pages/Map/Map';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


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
            {/* <PlacesAutocomplete /> */}
          </form>
        </div>
        <button><a href="http://localhost:3000/map">Map</a></button>
      </div>    
    )
  }
}