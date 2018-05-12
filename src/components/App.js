import React from 'react';
import _ from 'lodash';

import GuitarString from './GuitarString';


class App extends React.Component {
  constructor(props) {
    super(props);

    // getInitialState
    this.state = {
      // strings: {},

      // TODO: Make this dynamic and switchable
      // Hard part is converting the guitar fret/string -> note value
      // since teoria doesn't support note+step-interval => note
      tuning: [
        ['e2', 20], 
        ['a2', 25], 
        ['d3', 30], 
        ['g3', 35], 
        ['b3', 39], 
        ['e4', 44]
      ],
      
      selectedFrets: {},

      // keyNote: null,
      // keyType: null,

      numStrings: 6,
      numFrets: 24,
    }; 

  }

  clickFret = (e, fret) => {
    let newSelectedFrets = _.clone(this.state.selectedFrets);

    if (newSelectedFrets[fret.fretKey()]) {
      delete newSelectedFrets[fret.fretKey()];
    }
    else {
      newSelectedFrets[fret.fretKey()] = true;
    }

    this.setState({selectedFrets: newSelectedFrets});
  }

  renderStrings = () => {
    let strings =  _.map(_.range(1, this.state.numStrings+1), (n) => {
      return (
        <GuitarString 
          numFrets={this.state.numFrets}
          key={n}
          string={n}
          // keyNote={this.state.keyNote}
          // keyType={this.state.keyType}
          appOnClick={this.clickFret}
          // stringNote={this.state.tuning[n]}

          noteBase={this.state.tuning[n-1][0]}
          pianoBase={this.state.tuning[n-1][1]}
        />
      )
    })

    return strings;
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
