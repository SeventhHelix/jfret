import React from 'react';
import Fret from './Fret';
import _ from 'lodash';
import PropTypes from 'prop-types';
import teoria from 'teoria';

class GuitarString extends React.Component {
  constructor(props) {
    super(props);

    // getInitialState
    // See http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react
    // For how to set the callback when we select a fret on click
    this.state = {
    }; 
  }

  renderFrets() {
  {
      // +1 to include a 0th fret
      let frets =  _.map(_.range(this.props.numFrets+1), (n) => {
        let key = 'fret-'+this.props.string+'-'+n;
        let note = teoria.note.fromKey(this.props.pianoBase + n);

        return (
          <Fret 
            key={key}
            fretKey={key}
            note={note}
            fret={n}
            appOnClick={this.props.appOnClick}
            stringNote={this.props.noteBase}
            string={this.props.string}

            selectedFrets={this.props.selectedFrets}
          />
        )
      });

      return frets;
    }
  }

  render() {
    return (
      <div className="string-container">
        <span style={{position: "relative"}}>
          <span className="string" style={{height: 1 * this.props.string }}></span>
        </span>
        {
          this.renderFrets()
        }
      </div>
    )
  }
}

GuitarString.propTypes = {
  // string number
  // key: PropTypes.string,
  string: PropTypes.number,

  // Number of frets, static for now
  numFrets: PropTypes.number,

  // string note base, eg 'e4'
  noteBase: PropTypes.string,

  // piano note base, eg 20
  pianoBase: PropTypes.number,

  // dict of selected frets
  selectedFrets: PropTypes.object,
};


export default GuitarString;
