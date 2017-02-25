import React from 'react'
import ReactDom from 'react-dom'
import App from './components/App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import SearchBox from './components/SearchBox.jsx'
import SentimentText from './components/SentimentText.jsx'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDom.render(
<Router history={hashHistory}>
  <Route path="/" component={Home}>
    <IndexRoute component={App}/>
    <Route path="/about" component={About}/>
    <Route path="/app" component={App}/>
    <Route path="/search" component={SearchBox}/>
    <Route path="/sentiment" component={SentimentText}/>
  </Route>
</Router>, document.getElementById('root')) 