import React from 'react'
import Contents from './Contents.jsx'
import Book from './Book.jsx'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.clickMe = this.clickMe.bind(this)
  }

  clickMe(message) {
    console.log(message)
  }

  render() {
    let book = {title: "React in Action", author : "dont know" }
    return (
      <div style={{textAlign: 'center'}}>
        <h1 onClick={() => this.clickMe('message')}>Hello</h1>
        
        <Book details = {<Contents />} />
      </div>
    )
  }
}