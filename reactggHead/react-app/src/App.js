import React from 'react';
import ReactDOM from 'react-dom'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <Parent>
        <div className="child1"></div>

      </Parent>
    )
  }
}

class Parent extends React.Component {
  render () {
    //let items = this.props.children.map(child => child)
    //let items = React.Children.map(this.props.children, (child) => child)
    //let items = React.Children.toArray(this.props.children)
    let items = React.Children.only(this.props.children)
    console.log(items)
    return null
  }
}

export default App