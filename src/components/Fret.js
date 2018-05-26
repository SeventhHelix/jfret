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
    let intervalDisplay = "";

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

      // If it's a lower note, still give the higher interval
      if (selectedNote.key() > this.props.note.key()) {
        relativeInterval = relativeInterval.invert();
      }

      intervalDisplay = relativeInterval.toString();

      // Teoria toString adds -'s for some intervals but not others
      intervalDisplay = intervalDisplay.replace("-", "");

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

        // Teoria uses some awkward naming in some cases that doesn't seem consistent
        // Re-map them to more common interval names
        // TODO: A general way of mapping this would be good
        let intervalNaming = {
          'A1': 'm2',
          'A2': 'm3',
          'A3': 'P4',
          'A4': 'd5',
          'AA4': 'P5',
          'A5': 'm6',
          'AA5': 'M6',
          'A6': 'm7',

          'd1': 'm2',
          'd3': 'M2',
          'd4': 'M3',
          'dd4': 'm3',
          'dd5': 'P4',
          'd6': 'P5',
          'd7': 'M6',
          'd8': 'M7',
        }
        
        intervalDisplay = intervalNaming[intervalDisplay] || intervalDisplay;

        // Colour is determined by the interval type
        let colors = {
          'P1': "#FF0000",

          'm2': "#FF4500",
          'M2': "#FFA500",

          'm3': "#DAA520",
          'M3': "#FFFF00",

          'P4': "#ADFF2F",

          'd5': "#000",

          'P5': "#1E90FF",

          'm6': "#4B00CC",
          'M6': "#4B0082",

          'm7': "#AA82AA",
          'M7': "#EE82EE",

          'P8': "#FFFFFF",

          // 'A9': "#000",
          // 'm10': "#000",
        }
        overlayOpacity = "0.5";
        backgroundColor = colors[intervalDisplay] || "#000";
      }
    }

    if (opacityMask > 0) {
      return (
        <span style={{opacity: opacityMask}}>
          <span style={{backgroundColor: backgroundColor, opacity: overlayOpacity}} className={`fret-overlay`}/>
          <span className={`fret-note`}>{this.props.note.toString(true)}</span>
          <span className={`fret-rel-interval`}>{intervalDisplay}</span>
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
