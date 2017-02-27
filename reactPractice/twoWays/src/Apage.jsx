import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

class Apage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: this.props.toggle,
      imageC: <img src="http://graffitialphabet.org/letter-c/uppercase-graffiti-alphabet-c.jpg" />,
      imageF: <img src="http://alphabetletters.org/letters/letter-f/gothic-alphabet-letter-f.jpg" />
    }
  }
  updateDisplay () {
    this.setState ((oldState) => {
       oldState.display = !oldState.display
    })
  }
  render() {
    //console.log(this.props)
    if(this.state.display ) {
       return (
        <div>
          {this.state.imageC}
          A-Cost 
          <button onClick={this.updateDisplay.bind(this)}>A-FTE</button>
        </div>
      );
    }
    else {
      return (
        <div>
          {this.state.imageF}
          A-FTE
          <button onClick={this.updateDisplay.bind(this)}>A-COST</button>
        </div>
      );
    }
  }
}

export default Apage;

