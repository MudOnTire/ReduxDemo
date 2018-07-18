let nextTodoId = 0;

export default {
    addTodo: (text) => {
        return {
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: text
        };
    },
    toggleTodo: (id) => {
        return {
            type: 'TOGGLE_TODO',
            id
        };
    },
    setVisibilityFilter: (filter) => {
        return {
            type: 'SET_VISIBILITY',
            filter
        };
    }
}