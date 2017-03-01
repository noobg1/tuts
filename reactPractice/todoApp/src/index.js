import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

ReactDOM.render(
      <Router history={hashHistory}>
        <Route path='/(:filter)' component={App} />
        
      </Router>,
  document.getElementById('root')
);
