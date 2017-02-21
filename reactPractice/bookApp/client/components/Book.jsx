import React from 'react'
import Books from './books.js'

export default class Book extends React.Component {
  constructor(props) {
    super(props)
  }

  showDetails(index) {
    this.props.updateView({ page: Books[index].page, price: Books[index].price, name: Books[index].name })
  }

  render() {
    let booksList = Books.map((item, index) => {
      return (<li key={index} onClick={this.showDetails.bind(this, index)}>
        <ul value={item.page}>
          <li><b>{item.name}</b></li>
          <li>$: {item.price} </li>
        </ul>
      </li>)
    })
    return (
      <ol >
        {booksList}
      </ol>
    )
  }
}