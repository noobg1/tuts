import React from 'react';
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor () {
    super()
    this.state = {items: [], filter: ''}
  }
  componentWillMount () {
    fetch('http://swapi.co/api/people/?format=json')
    .then( response => response.json() )
    .then( ({results}) => {this.setState({items: results})} )
  }
  filterList (e) {
    this.setState({filter: e.target.value})
  }
  render () {
    let items = this.state.items
    if(this.state.filter) {
      items = items.filter( (item) => item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    }
    
    return (
      <div>
        <input onChange={this.filterList.bind(this)}/>
        {items.map( item => <Person person={item}/>)}
      
      </div>
    )
  }
}

const Person = (props) => <h4>{props.person.name}</h4>

export default App