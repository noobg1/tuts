import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

class Apage extends Component {
  constructor(props) {
    super(props)
    this.state = {display: true}
    this.imageC = <img src="http://graffitialphabet.org/letter-c/uppercase-graffiti-alphabet-c.jpg" />;
    this.imageF = <img src="http://alphabetletters.org/letters/letter-f/gothic-alphabet-letter-f.jpg" />;
  }
  updateDisplay () {
    this.setState ((oldState) => {
       oldState.display = !oldState.display
    })
  }
  render() {
    if(this.state.display ) {
       return (
        <div>
          {this.imageC}
          A-Cost 
          <button onClick={this.updateDisplay.bind(this)}>A-FTE</button>
        </div>
      );
    }
    else {
      return (
        <div>
          {this.imageF}
          A-FTE
          <button onClick={this.updateDisplay.bind(this)}>A-COST</button>
        </div>
      );
    }
  }
}

export default Apage;

