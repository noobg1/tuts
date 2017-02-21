import React from 'react';
import ReactDOM from 'react-dom'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '/* jsx here */',
      output: '',
      err: ''
    }
  }
  update ( e ) {
    let code = e.target.value
    try {
      this.setState({
        output: window.Babel
        .transform(code, {presets: ['es2015', 'react']})
        .code,
        err: ''
      })
    }catch (error) {
      this.setState({err: error.message})
    }
  }
  render () {
    return (
      <div>
        <header>{this.state.err}</header>
        <div className="container">
          <textarea 
          onChange={this.update.bind(this)}
          defaultValue={this.state.input}/>
          <pre>
          {this.state.output}
          </pre>
        </div>
      </div>
    )
  }
}



export default App