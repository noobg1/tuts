import React from 'react';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      cat: 'this is state cat'
    }
  }

  update( e ) {
    this.setState({cat: e.target.value})
  }
  render () {
    return (
      <div>
        <input onChange={this.update.bind(this)}/>
       <h1>{this.state.cat}</h1>
      </div>)
  }
}

App.propTypes = {
  txt: React.PropTypes.string.isRequired
}

App.defaultProps = {
  txt: 'default text'
}

export default App