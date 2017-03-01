import React, { Component } from 'react';
import './App.css';
import Container from './Container.jsx'

class App extends Component {
  render() {
    return (
      <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
          </header>
          <Container filter={this.props.params.filter}/>
      </section>
    );
  }
}

export default App;
