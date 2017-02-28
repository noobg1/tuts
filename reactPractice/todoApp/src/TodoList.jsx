import React, { Component } from 'react';
import Todo from './Todo.jsx'

const TodoList = (props) => {
  const mainSection = {
    display: 'block'
  };
  console.log(props.todos);
  let todos = props.todos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />
  });

  return (

    <section className="main" style={mainSection}>
      <ul classID="id-todo-list" className="todo-list">
          {todos} 
      </ul>
    </section>
  )
}

export default TodoList;