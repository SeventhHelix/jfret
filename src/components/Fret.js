import React from 'react';

class Fret extends React.Component {
  // testttt = (e) => e.preventDefault()
  constructor(props) {
    super(props);
    // getInitialState
    // See http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react
    // For how to set the callback when we select a fret on click
    this.state = {
      selected: false
    };
  };


  onClick = (e) => {
    this.setState({'selected': !this.state['selected']});
  };

  render() {
    return (
      <span className={`fret fret-w-${this.props.fret} {this.selected ? 'fret-selected' : ''}`} 
            // onClick={this.props.onClick}>
            onClick={this.onClick}>

        <span className={`overlay`}/>
      </span>
    )
  }
}


export default Fret;
