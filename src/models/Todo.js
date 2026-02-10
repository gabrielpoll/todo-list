export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = Date.now();
    }

    toggleCompleted() {
        const toggle = this.completed ? false : true;
        this.completed = toggle;
    }

    update(data) {
        this.description = data;
    }

    getSummary() {
        const status = this.completed ? `Concluido` : `Em progresso`;
        return `Title: ${this.title} | 
                Description: ${this.description} | 
                Date ${this.dueDate} | Priority: ${this.priority} | 
                Status: ${status}`
    }
}