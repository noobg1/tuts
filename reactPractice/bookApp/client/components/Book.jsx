import React from 'react'
import Books from './books.js'
import Search from './Search.jsx'

export default class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = { booksList: Books}
  }

  showDetails(index) {
    this.props.updateView({ page: Books[index].page, price: Books[index].price, name: Books[index].name })
  }
  searchBooks(searchInput) {
    let filteredBooks = []
    Books.forEach(function (book, index) {
      let matched = book.name.toLowerCase().match(searchInput.toLowerCase())
      if(matched)
        filteredBooks.push({ page: Books[index].page, price: Books[index].price, name: Books[index].name })
    })
    this.setState({booksList: filteredBooks })
  }

  render() {
    let booksList = this.state.booksList.map((item, index) => {
      return (<li key={index} onClick={this.showDetails.bind(this, index)}>
        <ul value={item.page}>
          <li><b>{item.name}</b></li>
          <li>$: {item.price} </li>
        </ul>
      </li>)
    })
    return (
      <div>
        <Search searchBooks={this.searchBooks.bind(this)}/>
        <ol >
          {booksList}
        </ol>
      </div>
    )
  }
}