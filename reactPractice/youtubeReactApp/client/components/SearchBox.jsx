import React from 'react'

export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    
  }
  getSearch(event) {
    this.props.search(event.target.value)
  }
  
  render() {
   
    return (
      <center>
      <div >
        <input  onChange={this.getSearch.bind(this)}/>
      </div>
      </center>
    )
  }
}