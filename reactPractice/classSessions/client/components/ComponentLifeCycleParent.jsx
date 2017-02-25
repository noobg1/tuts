import React from 'react'
import ComponentLifeCycleChild from './ComponentLifeCycleChild.jsx'

export default class ComponentLifeCycleParent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {value: 0}
    console.log('constructor called')
  }
  componentWillMount () {
    console.log('componentWillMount')
  }
  componentDidMount () {
    console.log('componentDidMount')
  }
  componentWillUnmount () {
    console.log('componentWillUnmount')
  }
  update() {
    this.setState((oldState) => { oldState.value++})
  }
  render () {
    {console.log('render')}
    return (
    <div>
      <button onClick={this.update.bind(this)}>Send new prop</button>
      <ComponentLifeCycleChild propExample={this.state.value}/>
    </div>)
  }
}