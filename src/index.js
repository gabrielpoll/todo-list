import "./style.css";
import { Todo } from "./models/Todo";
import { Project } from "./models/Project";


const workout = new Todo("Workout", "To workout", "10/10/26", "medium");

const workoutProject = new Project("Workout 2026 metas");

workoutProject.addTodo(workout);
console.log(workoutProject.getTodoById(workout.id));

