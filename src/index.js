import "./style.css";
import { Todo } from "./models/Todo";
import { Project } from "./models/Project";
import { AppState } from "./models/AppState";
import { saveState, loadState } from "./models/storage";

const appState = new AppState();
const savedState = loadState();

if (savedState) {
  appState.projects = savedState.projects.map(p => {
    const proj = new Project(p.name);
    proj.id = p.id;
    proj.todos = p.todos.map(t => {
      const todo = new Todo(t.title, t.description, t.dueDate, t.priority);
      todo.id = t.id;
      todo.completed = t.completed;
      return todo;
    });
    return proj;
  });
  appState.activeProjectId = savedState.activeProjectId;
} else {
  const defaultProject = new Project("Default");
  appState.addProject(defaultProject);
  appState.defineActive(defaultProject.id);
  saveState(appState);
}

const updateUI = () => {
  renderProjects();
  renderTodos();
  saveState(appState);
};

const renderProjects = () => {
  const projectContainer = document.getElementById("project-container")
  projectContainer.textContent = "";
  
  const getListProjects = appState.getProjects();

for (const project of getListProjects) {

  const getName = project.name;
  const projectPara = document.createElement("button")
  projectPara.classList.add("project-btn")

  projectPara.dataset.id = project.id;

  if (appState.activeProjectId === project.id) {
    projectPara.textContent = `* ${getName}`;
  } else {
    projectPara.textContent = getName;
  }

  projectPara.addEventListener("click", (e) => {
    const id = Number(e.currentTarget.dataset.id);
    appState.defineActive(id);
    updateUI();
  });

  projectContainer.appendChild(projectPara);
}
}

const renderTodos = () => {
  const todoContainer = document.getElementById("todo-container")
  const getActiveProject = appState.getActiveProject()
  todoContainer.textContent = "";

  for (const todo of getActiveProject.todos) {
    const todoPara = document.createElement("p");
    todoPara.textContent = `${todo.title}, ${todo.dueDate}, ${todo.description}, ${todo.priority}`

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete"

    deleteBtn.addEventListener("click", () => {
      getActiveProject.removeTodo(todo.id);
      updateUI();
    })

    todoContainer.appendChild(todoPara);
    todoContainer.appendChild(deleteBtn);
  }
}

const showBtn = document.getElementById("create-project-btn");
const form = document.getElementById("project-form");
const input = document.getElementById("project-name");

showBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const projectName = input.value;
  const newProject = new Project(projectName);
  appState.addProject(newProject);
  appState.defineActive(newProject.id);

  updateUI();
  form.reset();
  form.classList.add("hidden");
})

const todoForm = document.getElementById("todo-form");
const createTodoBtn = document.getElementById("create-todo-btn");

createTodoBtn.addEventListener("click", () => {
  todoForm.classList.toggle("hidden");
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = e.target["title-todo"].value;
  const description = e.target["description-todo"].value;
  const date = e.target["date-todo"].value;
  const priority = e.target["priority-todo"].value;

  const newTodo = new Todo(title, description, date, priority);
  const activeProject = appState.getActiveProject();
  activeProject.addTodo(newTodo);

  updateUI();
  todoForm.reset();
  todoForm.classList.add("hidden");
});





renderProjects()
renderTodos()
