import React from 'react'
import App from './App.jsx'
import {Link, IndexLink} from 'react-router'

export default class Home extends React.Component {
  render () {
  return (
    <div>
      <h1>SPA</h1>
      <ul className="header">
        <li> <Link to="/search" activeClassName="active"> search </Link> </li>
        <li> <Link to="/about" activeClassName="active"> About </Link> </li>
        <li> <Link to="/sentiment" activeClassName="active"> sentiment </Link> </li>
        <li> <IndexLink to="/" activeClassName="active"> Ad Free youtube </IndexLink> </li>
      </ul>
      <div className="content">
        {this.props.children}

      </div>
    </div>)
  }
}