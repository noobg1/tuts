import React from 'react'
import BookListView from './BookListView.jsx'
import BooksList from './books.js'


export default class BookView extends React.Component {
  constructor () {
    super()
    this.state = {currentBook: '', bookList: ''}
  }
  getBookInfo(book){
    this.setState({currentBook: book})
  }
  
  render() {
     console.log(this.state.bookList[0])
    return (
      <div >
        <h2> Books List </h2>
        <BookListView updateView={this.getBookInfo.bind(this)}/>
        <div>
          <p>name {this.state.currentBook.name}</p>
          <p>$ : {this.state.currentBook.price}</p>
          <p>No.pages {this.state.currentBook.page}</p>
        </div>
      </div>
    )
  }
}