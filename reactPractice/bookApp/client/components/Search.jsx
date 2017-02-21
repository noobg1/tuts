import React from 'react'
import Books from './books.js'

export default class BookView extends React.Component {
  search (event) {
    this.props.searchBooks(event.target.value)
  }
  render() {
    return (
      <div>
        <input onChange={this.search.bind(this)} />
      </div>
    )
  }
}