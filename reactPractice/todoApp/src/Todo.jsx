import React, { Component } from 'react'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLabel: true,
      value: this.props.todo.description
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState((oldState) => {
      oldState.value = this.props.todo.description
    })
  }
  showInput() {
    this.setState((oldState) => {
      oldState.showLabel = !oldState.showLabel
    })
  }
  updateTodo(e) {
    e.persist()
    if (e.key === 'Enter') {
      this.setState((oldState) => {
        oldState.value = e.target.value
      })
      this.showInput()
      this.props.updateTodo(this.props.todo, e.target.value, !this.state.status)
    }
  }
  updateTodoStatus(e) {
    this.setState((oldState) => {
      oldState.status = !oldState.status
      this.props.updateTodo(this.props.todo, this.state.value, oldState.status)
    })
  }

  destroyTodo () {
    this.props.destroyTodo(this.props.todo)
  }
  
  render() {
    const fadeStyleTodo = (this.props.todo.status) ? 'active' : 'completed'
    return (
      <div>
        <li className="${status} ">
          <div className="view">
            
            {
              this.state.showLabel ? 
              <div> 
                <input className="checkbox toggle" type="checkbox" name="checkbox" checked={this.props.todo.status} onChange={this.updateTodoStatus.bind(this)} />
                <label onDoubleClick={this.showInput.bind(this)} className={fadeStyleTodo}>{this.state.value}</label> 
                <button className="destroy" onClick={this.destroyTodo.bind(this)}></button>
              </div> : 
              <input className="edit" type="text" defaultValue={this.state.value} onKeyPress={this.updateTodo.bind(this)} />
            }
          </div>
        </li>
      </div>
    )
  }
}



export default Todo