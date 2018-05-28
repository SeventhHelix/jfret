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
        ['e4', 44],
        ['b3', 39], 
        ['g3', 35], 
        ['d3', 30], 
        ['a2', 25], 
        ['e2', 20], 
      ],
      
      selectedFrets: {},

      numStrings: 6,
      numFrets: 24,
    }; 

  }

  clickFret = (e, fret) => {
    // Only select one fret at a time for now -- janky
    // let newSelectedFrets = _.clone(this.state.selectedFrets);

    // deselect all frets when we click something
    let newSelectedFrets = {};

    if (newSelectedFrets[fret.fretKey()]) {
      delete newSelectedFrets[fret.fretKey()];
    }
    else {
      newSelectedFrets[fret.fretKey()] = fret;
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
          appOnClick={this.clickFret}

          noteBase={this.state.tuning[n-1][0]}
          pianoBase={this.state.tuning[n-1][1]}

          selectedFrets={this.state.selectedFrets}
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
