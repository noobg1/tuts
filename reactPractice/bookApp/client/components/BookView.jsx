import React from 'react'
import Book from './Book.jsx'
import Search from './Search.jsx'

export default class BookView extends React.Component {
  constructor () {
    super()
    this.state = {currentBook: '', bookList: ''}
  }
  getBookInfo(book){
    this.setState({currentBook: book})
  }
  searchBooks(books) {
    console.log(books)
  }

  render() {
    return (
      <div >
        <h2> Books List </h2>
        <Search searchBooks={this.searchBooks.bind(this)}/>
        <Book updateView={this.getBookInfo.bind(this)}/>
        <div>
          <p>name {this.state.currentBook.name}</p>
          <p>$ : {this.state.currentBook.price}</p>
          <p>No.pages {this.state.currentBook.page}</p>
        </div>
      </div>
    )
  }
}