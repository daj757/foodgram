import React from 'react';
import { Button } from 'react-bootstrap';
import './Index.scss';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

let pictures = ["../../../../public/images/main1.jpg", "../../../../public/images/main2.jpg" ];

let picture = pictures[Math.floor(Math.random() * pictures.length)];

const loader1 = () => (
  <div class="mult3">
      <div class="mult3circle1"></div>
      <div class="mult3circle2"></div>
   </div>
  )
const Index = () => (

  <div id= "main" className="Index">
   
    <h1>Goola</h1>
    <p>An Instagram for food lovers</p>
    <div>
         <ImagesUploader
        url="http://localhost:9090/notmultiple"
        optimisticPreviews
        multiple={false}
        onLoadEnd={(err) => {
          if (err) {
            console.error(err);
          }
        }}
        label="Upload a picture"
        />
    
    </div>
    <footer>
      <p>Test it out. Upload a food image and let us classify it for you.</p>
    </footer>
      
  </div>
);






export default Index;
