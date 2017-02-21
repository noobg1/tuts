import React from 'react'

export default class Book extends React.Component {
  constructor(props) {
    super(props)
  }

  clickMe(message) {
    console.log(message)
  }

  render() {
    return (
      <div >
        {/*<h2>{this.props.details.title}</h2>
        <h2>{this.props.details.author}</h2>*/}
        {this.props.details}
      </div>
    )
  }
}