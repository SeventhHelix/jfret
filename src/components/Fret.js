import React from 'react';
import PropTypes from 'prop-types';
import teoria from 'teoria';
import _ from 'lodash';

class Fret extends React.Component {
  constructor(props) {
    super(props);
    // getInitialState
    // See http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react
    // For how to set the callback when we select a fret on click
    this.state = {
      selected: false,
      hover: false,
    };
  };


  onClick = (e) => {
    this.setState({'selected': !this.state['selected']});
    this.props.appOnClick(e, this);
  };

  onMouseEnter = (e) => {
    this.setState({hover: true});
  };

  onMouseLeave = (e) => {
    this.setState({hover: false});
  };

  fretKey = () => {
    return this.props.fretKey;
  };

  render() {
    return (
      <span className={`fret fret-w-${this.props.fret} {this.state.selected ? 'fret-selected' : ''}`} 
            onClick={this.onClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
      >

      { (this.state.selected || this.state.hover) &&
        <span>
          <span className={`fret-overlay`}/>
          <span className={`fret-note`}>{this.props.note.toString(true)}</span>
        </span>
      }

      { _.includes([5, 7, 9, 12, 15, 17], this.props.fret ) && this.props.string === 3 &&
          <span className={`fret-dot`}>∙</span>
      }
      </span>
    )
  }
}

Fret.propTypes = {
  key: PropTypes.string,
  fretNumber: PropTypes.number,
  fretKey: PropTypes.string,
  note: PropTypes.object,
  fret: PropTypes.number,
  appOnClick: PropTypes.func,
  string: PropTypes.number,
};


export default Fret;
