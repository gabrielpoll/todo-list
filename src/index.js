import "./style.css";
import { Todo } from "./models/Todo";
import { Project } from "./models/Project";
import { AppState } from "./models/AppState";


const workout = new Todo("Workout", "To workout", "10/10/26", "medium");

const workoutProject = new Project("Workout 2026 metas");

workoutProject.addTodo(workout);

const appState = new AppState();
appState.addProject(workoutProject);
console.log(appState.getProjects());

