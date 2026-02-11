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

console.log(appState);

