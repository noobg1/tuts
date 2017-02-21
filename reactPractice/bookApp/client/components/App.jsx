import React from 'react'
import Book from './Book.jsx'
import BookView from './BookView.jsx'

export default class App extends React.Component {

  render() {
    return (
      <div >
        <BookView />
      </div>
    )
  }
}