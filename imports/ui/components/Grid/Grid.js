import React, { Component } from 'react';

import { FlipCard } from 'react-flop-card';


export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flippedKey: null
    };
    this.cards = Array.apply(null, {length: 64}).map((val, ind) => ({
      key: String(ind),
      style: {
        front: this.getFrontStyle(ind),
        back: backStyle,
        wrapper: wrapperStyle
      },
      frontChild: (<noscript/>),
      backChild: (<p style={ letterStyle }>{ randomLetter() }</p>),
      onMouseOver: () => { this.setState({ flippedKey: String(ind) }); },
      onMouseOut: () => { this.setState({ flippedKey: null }); }
    }));
  }

  getFrontStyle(ind) {
    const y = (ind - ind % 8) / 8 * -104;
    const x = ind % 8 * -104 -300;
    const backgroundStyle = `url("public/images/rl.jpeg") ${x}px ${y}px/auto`;
    return {
      background: backgroundStyle,
      borderRadius: '20px'
    };
  }

  render() {
    return (
      <div style={ containerStyle }>
        { this.cards.map(({
          key, frontChild, backChild, onMouseOver, onMouseOut, style
        }) => (

          <FlipCard
            key={ key }
            flipped={ this.state.flippedKey === key }
            onMouseOut={ onMouseOut } onMouseOver={ onMouseOver }
            frontChild={ frontChild } backChild={ backChild }
            width={ 250 } height={ 250 } style={ style }/>

        )) }
      </div>
    );
  }
}

const backStyle = {
  backgroundColor: '#E3B505',
  borderRadius: '20px'
};

const letterStyle = {
  color: '#084C61',
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
