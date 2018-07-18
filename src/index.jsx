import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import todoApp from './todo';
import todoActions from './todoActions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_UNCOMPLETED':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

//add todos
let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <input
        ref={node => { input = node; }}
        type="text"
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            dispatch(todoActions.addTodo(input.value));
            input.value = '';
          }
        }}
        placeholder="Please enter your todo, and press Enter to add it to list"
      />
    </div>
  )
}

AddTodo = connect()(AddTodo);

// todo list
const Todo = ({ onClick, text, completed, id }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {`${id}: ${text}`}
  </li>
)

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {
      todos.map(todo =>
        <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id)}
        />)
    }
  </ul>
)

//mapStateToProps
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) =>
      dispatch(todoActions.toggleTodo(id))
  }
}

const VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList);

//footer
const Link = ({ active, children, onFilterClick }) => {
  if (active) {
    return (
      <span>{children}</span>
    )
  }
  return (
    <a
      href="#"
      onClick={e => {
        console.log(onFilterClick);
        e.preventDefault();
        onFilterClick();
      }}
      style={{ padding: '10px' }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = (state, props) => {
  return {
    active: state.visibilityFilter === props.filter
  };
};

const mapDispatchToLinkProps = (dispatch, props) => {
  return {
    onFilterClick: () => dispatch(todoActions.setVisibilityFilter(props.filter))
  }
}

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);

const Footer = () => (
  <div>
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
    <FilterLink filter="SHOW_UNCOMPLETED">
      Uncompleted
    </FilterLink>
  </div>
)

//todo app
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

const createStore = require('redux').createStore;

ReactDOM.render(
  <Provider
    store={createStore(todoApp)}
  >
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);