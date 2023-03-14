import React, { Component } from 'react';

export default class TodoList extends Component {
  state = {
    todos: [],
    inputValue: '',
  };

  handleAddTodo = (event) => {
    event.preventDefault();
    if (this.state.inputValue) {
      this.setState((prevState) => ({
        todos: [...prevState.todos, { text: prevState.inputValue, completed: false }],
        inputValue: '',
      }));
    }
  };

  handleToggleTodo = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  handleDeleteTodo = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo, i) => i !== index),
    }));
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  render() {
    const { todos } = this.state;
    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;

    return (
      <div>
        <form onSubmit={this.handleAddTodo}>
          <input
            type="text"
            placeholder="Add Todo"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <p>
          Completed: {completedCount} / {totalCount}
        </p>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <span
                onClick={() => this.handleToggleTodo(index)}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text}
              </span>
              <button onClick={() => this.handleDeleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
