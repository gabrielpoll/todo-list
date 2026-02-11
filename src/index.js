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
    todoContainer.appendChild(todoPara);
  }

}

const testProject = new Project("Teste Project");
const todoTeste = new Todo("Todo testing", "Testing the todo class", "11/02/26", "high");
const anotherTodoTest = new Todo("testnadsad", "sdasfsdg", "30;=-3", "high");
testProject.addTodo(anotherTodoTest);
testProject.addTodo(todoTeste);
appState.addProject(testProject);


 
appState.defineActive(testProject.id);
renderProjects()
renderTodos()

