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

  hoverRender = () => {
    let relativeInterval = "";

    let opacityMask = "1";
    let overlayOpacity = "0.05";
    let backgroundColor = "#000";

    if (!(this.state.selected || this.state.hover)) {
      opacityMask = "0";
    }

    let distance = 0;
    // Calculate the interval between this note and the first selected note
    // Currently can select multiple notes, so just fudge it and choose one
    if (!_.isEmpty(this.props.selectedFrets)) {
      let selectedFret = _.values(this.props.selectedFrets)[0];
      let selectedNote = selectedFret.props.note;
      relativeInterval = this.props.note.interval(selectedNote);

      // If it's a lower note, still give the higher interval since it's easier to think about
      if (selectedNote.key() > this.props.note.key()) {
        selectedNote = relativeInterval.invert();
      }
      relativeInterval = relativeInterval.toString();

      if (!(this.state.selected || this.state.hover)) {
        // Hide if too far away
        let fretDistance = Math.abs(this.props.fret - selectedFret.props.fret);
        let stringDistance = Math.abs(this.props.string - selectedFret.props.string);
        let distance = Math.sqrt(Math.pow(fretDistance, 2) + Math.pow(stringDistance, 2));
        
        if (distance > 3) {
          opacityMask = "0";
        }
        else {
          opacityMask = "1";
        }

        // Colour is determined by the interval type
        let colors = {
          'P1': "#FFFFFF",
          'm2': "#800000",
          'M2': "#000",
          'm3': "#00FFFF",
          'M3': "#0000FF",
          'P4': "#800080",
          'A4': "#800000",
          'P5': "#FF0000",
          'A5': "#00FF00",
          'M6': "#008080",
          'M7': "#000080",
          'P8': "#FFFFFF",
          'A9': "#000",
          'm10': "#000",
        }
        overlayOpacity = "0.2";
        backgroundColor = colors[relativeInterval.replace("-", "")];
      }
    }

    if (opacityMask > 0) {
      return (
        <span style={{opacity: opacityMask}}>
          <span style={{backgroundColor: backgroundColor, opacity: overlayOpacity}} className={`fret-overlay`}/>
          <span className={`fret-note`}>{this.props.note.toString(true)}</span>
          <span className={`fret-rel-interval`}>{relativeInterval}</span>
        </span>
      )
    }
  };

  render() {
    return (
      <span className={`fret fret-w-${this.props.fret} {this.state.selected ? 'fret-selected' : ''}`} 
            onClick={this.onClick}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
      >

      { 
        // Overlay displays during over or click-selection
        this.hoverRender()
      }

      { 
        // Display fret dots in the middle of the fretboard
        _.includes([5, 7, 9, 12, 15, 17, 19, 21, 24], this.props.fret ) && this.props.string === 3 &&
          <span className={`fret-dot`}>∙</span>
      }
      </span>
    )
  }
}

Fret.propTypes = {
  // react key -- fret-{string#}-{fret#} 
  // key: PropTypes.string,
  fretKey: PropTypes.string,

  // string #
  string: PropTypes.number,

  // fret #
  fret: PropTypes.number,

  // teoria note obj
  note: PropTypes.object,

  // app-level handler, manages the list of selected frets
  appOnClick: PropTypes.func,

  // dict of selected frets
  selectedFrets: PropTypes.object,
};


export default Fret;
