import React from 'react';
import _ from 'lodash';

import GuitarString from './GuitarString';


class App extends React.Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      // strings: {},
      // tuning: {},
      
      selectedFrets: {},

      keyNote: null,
      keyType: null,

      numStrings: 7,
      numFrets: 24,
    }; 

    this.clickFret = this.clickFret.bind(this)
  }

  clickFret = (fret) => {
    let newSelectedFrets = _.clone(this.state.selectedFrets);

    if (newSelectedFrets[fret]) {
      delete newSelectedFrets[fret];
    }
    else {
      newSelectedFrets[fret] = true;
    }

    this.setState({selectedFrets: newSelectedFrets});
  }

  renderStrings() {
    let x =  _.map(_.range(this.state.numStrings), (n) => {
      return (
        <GuitarString 
          numFrets={this.state.numFrets}
          key={n}
          string={n}
          keyNote={this.state.keyNote}
          keyType={this.state.keyType}
          clickFret={this.clickFret}
        />
      )
    })

    return x;
  }

  render() {
    return (
      <div id="app-container" className="app-container">
        {
          this.renderStrings()
        }
      </div>
    )
  }
}


export default App;
