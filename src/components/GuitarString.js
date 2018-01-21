import React from 'react';
import Fret from './Fret';
import _ from 'lodash';

class GuitarString extends React.Component {
  constructor(props) {
    super(props);
    /*
    Props
          numFrets
          key
          string
          keyNote
          keyType
    */

    // getInitialState
    // See http://stackoverflow.com/questions/27991366/what-is-the-difference-between-state-and-props-in-react
    // For how to set the callback when we select a fret on click
    this.state = {
    }; 

    this.click = this.click.bind(this)
  }

  click(e, f) {
    console.log(e);
    console.log(f);
  }

  renderFrets() {
  {
      // +1 to include a 0th fret
      let frets =  _.map(_.range(this.props.numFrets+1), (n) => {
        return (
          <Fret 
            key={'fret-'+this.props.string+'-'+n}
            note={'a'}
            fret={n}
            onClick={this.click}
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
        <span className="string"></span>
        {
          this.renderFrets()
        }
      </div>
    )
  }
}


export default GuitarString;
