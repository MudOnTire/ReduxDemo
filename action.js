function visibilityFilter(filter = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return filter;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }]);
    case 'TOGGLE_TODO':
      return state.map(
        (todo, index) =>
          action.index === index
            ? { text: todo.text, completed: !todo.completed }
            : todo
      )
    default:
      return state;
  }
}

function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}

const state = {
  todos: [
    {
      text: 'Eat food',
      completed: true
    }, {
      text: 'Exercise',
      completed: false
    }
  ],
  visibilityFilter: 'SHOW_COMPLETED'
};

const action1 = {
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
};

const action2 = {
  type: 'ADD_TODO',
  text: 'GO to swimming pool'
};

const action3 = {
  type: 'TOGGLE_TODO',
  index: 1
};

const result1 = todoApp(state, action1);
console.log(result1);

const result2 = todoApp(result1, action2);
console.log(result2);

const result3 = todoApp(result2, action3);
console.log(result3);
