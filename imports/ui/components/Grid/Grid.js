import React, { Component } from 'react';
import { FlipCard } from 'react-flop-card';
import ImageArray from '../ImageArray/ImageArray';
const gridLength = ImageArray.length;

export default class GridView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      flippedKey: []
    };
    this.cards = Array.apply(null, {length: gridLength}).map((val, ind) => ({
      key: String(ind),
      style: {
        front: loop(),
        back: backStyle,
        wrapper: wrapperStyle
      },
      frontChild: (<noscript/>),
      backChild: (<p style={ letterStyle }>{ randomLetter() }</p>),
      onClick: () => {
        if (this.state.flippedKey.includes(String(ind))) {
          var newFlipped = this.state.flippedKey;
          if (newFlipped.indexOf(String(ind)) > -1) {
              newFlipped.splice(newFlipped.indexOf(String(ind)), 1);
          }
          this.setState({flippedKey: newFlipped});
        } else {
          var newFlipped = this.state.flippedKey;
          newFlipped.push(String(ind));
          this.setState({flippedKey: newFlipped});
        }
      },
      // onMouseOut: () => { this.setState({ flippedKey: null }); }
    }));
    // console.log(FrontStyle);
  }
  loop = ()=> {
    var ticker = -1;
    ticker++;
    for (var i = 0; i < ImageArray.length; i++) {
      if (i === ticker) {
        return ImageArray[i];
      }
    }
  }

  render() {
    return (
      <div style={ containerStyle }>
        { this.cards.map(({
          key, frontChild, backChild, onClick, style
        }) => (
          <FlipCard
            key={ key }
            flipped={ this.state.flippedKey.includes(key) }
            onClick={ onClick }
            frontChild={ frontChild } backChild={ backChild }
            width={ 250 } height={ 250 } style={ style }/>
        )) }
      </div>
    );
  }
}


  // getFrontStyle(ind) {
  //   const y = (ind - ind % 8) / 8 * -104;
  //   const x = ind % 8 * -104 -300;
  //   const backgroundStyle = `url("public/images/rl.jpeg") ${x}px ${y}px/auto`;
  //   return {
  //     background: backgroundStyle,
  //     borderRadius: '20px'
  //   };
  // }

// var frontArray = [];
// for (var i = 0; i < ImageArray.length; i++) {
//   frontArray.push({
//     backgroundImage: `url('./images/${ImageArray[i]}')`,
//     borderRadius: '25px'
//   });
// }
var ticker = -1;
const loop = ()=> {
  ticker++;
  for (var i = 0; i < ImageArray.length; i++) {
    if (i === ticker) {
      return ImageArray[i];
    }
  }
}


const backStyle = {
  backgroundColor: '#084C61',
  borderRadius: '20px'
};

const letterStyle = {
  color: '#E3B505',
  fontSize: '80px',
  margin: '20px 0',
  textAlign: 'center',
  fontFamily: 'sans-serif'
};

const containerStyle = {
  fontSize: 0,
  width: '832px',
  margin: '0 auto'
};

const wrapperStyle = {
  display: 'inline-block',
  margin: '2px'
};

function randomLetter() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return possible.charAt(
    Math.floor(Math.random() * possible.length)
  );
}
// import React from 'react';
// import FlipCard from 'react-flipcard-2';
//
// export default class GridView extends React.Component {
// constructor(props) {
//     super(props);
//
//     this.state = {
//       isFlipped: false
//     };
//   }
//
//   showBack() {
//     this.setState({
//       isFlipped: true
//     });
//   }
//
//   showFront() {
//     this.setState({
//       isFlipped: false
//     });
//   }
//
//   handleOnFlip(flipped) {
//     if (flipped) {
//       this.refs.backButton.getDOMNode().focus();
//     }
//   }
//
//   handleKeyDown(e) {
//     if (this.state.isFlipped && e.keyCode === 27) {
//       this.showFront();
//     }
//   }
//
//   render() {
//     return (
//       <div>
//         {/* Default behavior is horizontal flip on hover, or focus */}
//         <FlipCard>
//           {/* The first child is used as the front of the card */}
//           <div>
//             <div>Front</div>
//             //
//             <div><small>(horizontal flip)</small></div>
//           </div>
//           {/* The second child is used as the back of the card */}
//           <div>Back</div>
//         </FlipCard>
//
//         {/* The `type` attribute allows using a vertical flip */}
//         <FlipCard type="vertical">
//           <div>
//             <div>Front</div>
//             <div><small>(vertical flip)</small></div>
//           </div>
//           <div>Back</div>
//         </FlipCard>
//
//         {/*
//           The `disabled` attribute allows turning off the auto-flip
//           on hover, or focus. This allows manual control over flipping.
//
//           The `flipped` attribute indicates whether to show the front,
//           or the back, with `true` meaning show the back.
//         */}
//         <FlipCard
//           disabled={true}
//           flipped={this.state.isFlipped}
//           onFlip={this.handleOnFlip}
//           onKeyDown={this.handleKeyDown}
//         >
//           <div>
//             <div>Front</div>
//             <button type="button" onClick={this.showBack}>Show back</button>
//             <div><small>(manual flip)</small></div>
//           </div>
//           <div>
//             <div>Back</div>
//             <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>
//           </div>
//         </FlipCard>
//       </div>
//     );
//   }
// }
