import React from 'react';

class App extends React.Component {
  render () {
    return (
      <Title txt="prop sent"/>)
  }
}

const Title = (props) => <h1> Title: {props.txt}</h1>

Title.propTypes = {
  txt(props, propName, component) {
    if(!(propName in props)) {
      return new Error(`missing ${propName}`)
    }
  }
}

export default App