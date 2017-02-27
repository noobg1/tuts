import React, { Component } from 'react';
import './App.css';
import Home from './Home.jsx';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Apage from './Apage.jsx';
import Bpage from './Bpage.jsx';

class App extends Component {
  render() {
    return (
     <Router history={hashHistory}>
        <Route path='/' component={Home} >
          <Route path='toA' component={Apage}/>
          <Route path='toB' component={Bpage}/>
        </Route>
      </Router>
    );
  }
}

export default App;
