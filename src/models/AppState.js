export class AppState {
    constructor() {
        this.projects = [];
        this.activeProjectId;
    }

    addProject(project) {
        this.projects.push(project);
    }

    removeProject(id) {
        if (this.activeProjectId === id) {this.defineActive(null)}
        const projectArray = this.projects.filter(item => item.id !== id);
        this.projects = projectArray;
    }

    defineActive(projectId) {
        this.activeProjectId = projectId;
    }

    getActiveProject() {
        const id = this.activeProjectId;
        return this.projects.find(item => item.id === id)
    }

    getProjects() {
        return this.projects;
    }
}