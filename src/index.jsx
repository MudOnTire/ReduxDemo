import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoStore from './todo';
import store from './todo';

const FilterLink = ({ filter, children }) => {
  if (filter === TodoStore.getState().visibilityFilter) {
    return (
      <span>{children}</span>
    )
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY',
          filter: filter
        });
      }}
      style={{ padding: '10px' }}
    >
      {children}
    </a>
  )
}
class TodoList extends Component {

  nextTodoId = 0;

  onKeyPress = (event, param) => {
    if (event.key === 'Enter') {
      const value = this.input.value;
      TodoStore.dispatch({
        type: 'ADD_TODO',
        text: value,
        id: this.nextTodoId++
      });
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onKeyPress={this.onKeyPress}
          placeholder="Please enter your todo, and press Enter to add it to list"
          ref={node => { this.input = node }}
        />
        <ul>
          {
            TodoStore.getState().todos.map((todo, index) => {
              const li = (
                <li
                  key={todo.id}
                  onClick={() => {
                    TodoStore.dispatch({
                      type: 'TOGGLE_TODO',
                      id: todo.id
                    })
                  }}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                >
                  {`${todo.id}: ${todo.text}`}
                </li>
              );
              switch (TodoStore.getState().visibilityFilter) {
                case 'SHOW_ALL':
                  return li;
                case 'SHOW_COMPLETED':
                  if (todo.completed) {
                    return li;
                  } else {
                    return null;
                  }
                case 'SHOW_UNCOMPLETED':
                  if (todo.completed) {
                    return null;
                  } else {
                    return li;
                  }
              }
            })
          }
        </ul>
        <FilterLink filter="SHOW_ALL">All</FilterLink>
        <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
        <FilterLink filter="SHOW_UNCOMPLETED">Uncompleted</FilterLink>
      </div>
    )
  }
}

const render = () => {

  ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
  );
};

TodoStore.subscribe(render);
render();