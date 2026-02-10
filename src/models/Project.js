export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {;
        this.todos.push(todo);
    }

    removeTodo(id) {
        const todoArray = this.todos.filter(item => item.id !== id);
        this.todos = todoArray;
    }

    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }
};