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
        <Widget update={this.update.bind(this)}/>
       <h1>{this.state.cat}</h1>
      </div>)
  }
}

const Widget = (props) => <input onChange={props.update}/>

export default App