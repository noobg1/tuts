import React from 'react'

export default class ComponentLifeCycleChild extends React.Component {
  constructor (props) {
    super(props)
    console.log('child constructor called')
  }
  // componentWillMount () {
  //   console.log('child  componentWillMount')
  // }
  // componentDidMount () {
  //   console.log('child componentDidMount')
  // }
  // componentWillUnmount () {
  //   console.log('child componentWillUnmount')
  // }
  componentWillReceiveProps() {
    console.log('child componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps) {
    console.log('child shouldComponentUpdate')
    console.log(nextProps.propExample)
    if(nextProps.propExample === this.props.propExample + 1)
      return true
    return false
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate ')
  }
  render () {
    {console.log('child render')}
    return (<h1> props from parent: {this.props.propExample} </h1>)
  }
}