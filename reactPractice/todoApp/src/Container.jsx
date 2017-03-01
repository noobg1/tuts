import React, { Component } from 'react';
import TodoList from './TodoList.jsx';
import axios from 'axios';
import Apicalls from './Apicalls.js'
import qs from 'qs';
import Footer from './Footer.jsx'
import {getActiveItems} from './helperFunctions.js'

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = { checkAll: true, todos: [] }
    this.entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    this.escapeHtml = (string) => String(string).replace(/[&<>"'`=\/]/g, s => this.entityMap[s]);
  }
  addItem(newTodoDescription) {
    axios.post(`http://localhost:8001/api/write/${newTodoDescription}`)
      .then((response) => {
        let newTodo = {
          id: response.data.id,
          status: false,
          description: newTodoDescription
        }
        this.setState((oldState => {
          oldState.todos[newTodo.id] = newTodo;
        }))
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  toggleCheckAll (status) {
    let todosList  = this.state.todos;
    this.setState ((oldState) => {
        oldState.checkAll = !this.state.checkAll;
    })
    let tempTodos = [];
    todosList.forEach((todo) => {
      let newTodo = {
          id: todo.id,
          status: this.state.checkAll,
          description: todo.description
        }
        tempTodos[newTodo.id] = newTodo;
        this.updateTodo(newTodo, newTodo.description, newTodo.status);
    })
    this.setState ((oldState) => {
        oldState.todos = tempTodos;
      })
    
    console.log(this.state.todos, this.state.checkAll);
  }
  componentDidMount () {
    axios.get('http://localhost:8001/api/read/')
    .then((response) => {
      let todoObjects = response.data;
      let tempTodos = [];
      todoObjects.forEach((todo) => {
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

  updateTodo (todo, updatedDesciption, status) {
    let toUpdate = {
      task: updatedDesciption,
      status: status
    }
    axios.put(`http://localhost:8001/api/update/${todo.id}`, qs.stringify(toUpdate))
    .then((response) => {
      todo.status = status;
      todo.description = updatedDesciption;
      this.setState((oldState) => {
        oldState.todos[todo.id] = todo;
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  destroyTodo (todo) {
    axios.delete(`http://localhost:8001/api/delete/${todo.id}`)
    .then((response) => {
      this.setState((oldState) => {
        delete oldState.todos[todo.id];
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  clearCompleted () {
    this.state.todos.forEach((todo) => {
      if(todo.status) {
        this.destroyTodo (todo);
      }
    })
  }

  render() {
    let currentTodos = [];
    const currentUrl =  this.props.filter;
    console.log('1',this.props.filter);
      
    switch(currentUrl){
      case 'All':
      currentTodos = this.state.todos;
      break;
      case 'Active':
      currentTodos = this.state.todos.filter((item) => item.status === false);
      break;
      case 'Completed':
      currentTodos = this.state.todos.filter((item) => item.status === true);
      break;
      default:
      currentTodos = this.state.todos;
      break;
    } 
    return (
      <div >
        <Input addItem={this.addItem.bind(this)} toggleCheckAll={this.toggleCheckAll.bind(this)} />
        <TodoList todos={currentTodos} updateTodo={this.updateTodo.bind(this)} destroyTodo={this.destroyTodo.bind(this)}/>
        <Footer activeItems={getActiveItems(this.state.todos)} clearCompleted={this.clearCompleted.bind(this)}/>
      </div>
    );
  }
}

class Input extends Component {
  addItem (e) {
    if (e.key === 'Enter') {
      this.props.addItem(e.target.value);
      this.refs.newTodo.value = '';
    }
  }
  toggleStatus () {
    this.props.toggleCheckAll()
  }
  render () {
    
    return (
      <div>
        <input classID="id-new-todo" ref="newTodo" className="new-todo" placeholder="What needs to be done?" autoFocus onKeyPress={this.addItem.bind(this)} />
        <input className="toggle-all" type="checkbox" onClick={this.toggleStatus.bind(this)}/>
        <label htmlFor="toggle-all">Mark all as complete</label>
      </div>
      )
  }
  
}

export default Container;