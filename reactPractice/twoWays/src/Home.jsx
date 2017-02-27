import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Intermediate from './Intermediate.jsx'

class Home extends Component {
  constructor (props) {
    super(props);
    this.state = {
      toggle: true
    };
  }
  updateDisplay () {
    this.setState((oldState) => {
      oldState.toggle = !oldState.toggle;
    })
  }
  render() {
    return (
      <div>
        <Link to='/toA' activeClassName="active" onClick={this.updateDisplay.bind(this)}>A</Link>&nbsp;&nbsp;
        <Link to='/toB' activeClassName="active" onClick={this.updateDisplay.bind(this)}>B</Link>
        {this.props.children}
        {/*{ React.cloneElement( this.props.children, {toggle: this.state.toggle})}*/}
      </div>
    );
  }
}

export default Home;
