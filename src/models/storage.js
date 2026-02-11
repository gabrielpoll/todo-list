const STORAGE_KEY = "todo-app-state";

export function saveState(appState) {
  const plainObject = {
    projects: appState.getProjects(),
    activeProjectId: appState.activeProjectId
  }; 

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(plainObject)
  );
}

export function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data);
}
