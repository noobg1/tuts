import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

class Home extends Component {
  render() {
    return (
      <div>
        <Nav />
        {/*<Button getType={'toA'}/>
        <Button getType={'toB'}/>*/}
        {this.props.children}
      </div>
    );
  }
}

export default Home;

const Nav = () => (
  <div>
    <Link to='/toA' activeClassName="active">A</Link>&nbsp;&nbsp;
    <Link to='/toB' activeClassName="active">B</Link>
  </div>
)
// const Button = (props) =>  {return <button> <Link to={'/' + props.getType} >{props.getType}</Link> </button>}