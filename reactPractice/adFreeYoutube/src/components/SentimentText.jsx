import React from 'react'
//import axios from 'axios'
import request from 'superagent'

export default class SentimentText extends React.Component {
  constructor (props) {
    super (props)
    this.state = {text: '', sentiment: ''}
  }
  getSentiment (e) {
    //console.log(e.target.value)
    const text = e.target.value
    const urlS = `noobg1.pythonanywhere.com/q/${text}`
    request('GET', urlS).then( (results) => 
    console.log(results.text), (err) => console.log(err))
  }
  render () {
  return (
    <div>
      <input onBlur={this.getSentiment.bind(this)} />
    </div>)
  }
} 