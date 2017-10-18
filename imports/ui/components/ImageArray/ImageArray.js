import React from "react";

const ImageArray = [
  'burgerImage.jpg',
  'rl.jpeg'
]

var frontArray = [];
  for (var i = 0; i < ImageArray.length; i++) {
    frontArray.push({
      backgroundImage: `url('./images/${ImageArray[i]}')`,
      borderRadius: '25px'
    });
  }
console.log(frontArray);
export default frontArray;