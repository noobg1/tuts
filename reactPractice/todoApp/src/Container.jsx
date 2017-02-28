import React, { Component } from 'react';
import TodoList from './TodoList.jsx';
import axios from 'axios';
import Apicalls from './Apicalls.js'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = { checkAll: true, todos: [] }
  }
  addItem(newTodo) {
    console.log(newTodo);
  }
  toggleCheckAll(status) {
    console.log(status);
  }
  componentDidMount () {
    axios.get('http://localhost:8001/api/read/')
    .then( (response) => {
      let todoObjects = response.data;
      let tempTodos = [];
      todoObjects.forEach ((todo) => {
        tempTodos[todo.id] = todo;
      })
      this.setState((oldState) => {
        oldState.todos = tempTodos;
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  updateTodo (todo) {
    console.log(todo);
  }
  render() {
    // console.log(this.state.todos)
    return (
      <div >
        <Input addItem={this.addItem.bind(this)} toggleCheckAll={this.toggleCheckAll.bind(this)} />
        <TodoList todos={this.state.todos} updateTodo={this.updateTodo.bind(this)}/>
      </div>
    );
  }
}

const Input = (props) => {
  function addItem(e) {
    if (e.key === 'Enter') {
      props.addItem(e.target.value);
    }
  }
  return (
    <div>
      <input classID="id-new-todo" className="new-todo" placeholder="What needs to be done?" autoFocus onKeyPress={addItem} />
      <input  className="toggle-all" type="checkbox"/>
      <label htmlFor="toggle-all">Mark all as complete</label>
    </div>)
}

export default Container;