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
          />
        )
      });

      return frets;
    }
  }

  render() {
    // TODO: Make it look like an actual string is here
    return (
      <div className="string-container">
        <span className="string" style={{height: 2 * this.props.string }}></span>
        {
          this.renderFrets()
        }
      </div>
    )
  }
}

GuitarString.propTypes = {
  numFrets: PropTypes.number,
  key: PropTypes.string,
  string: PropTypes.number,
  // keyNote: PropTypes.,
  // keyType: PropTypes.foo,
  noteBase: PropTypes.string,
  pianoBase: PropTypes.number,
};


export default GuitarString;
