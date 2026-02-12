/**
 * TaskFlow - Module de gestion des tâches
 *
 * Ce module contient la logique métier de l'application.
 * Les données sont persistées dans le localStorage.
 */

const STORAGE_KEY = 'taskflow-tasks'

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    console.error('Erreur lors du chargement des tâches')
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    console.error('Erreur lors de la sauvegarde des tâches')
  }
}

export function createTask(text, priority = 'medium') {
  if (!text || typeof text !== 'string') {
    throw new Error('Le texte de la tâche est requis')
  }

  const trimmedText = text.trim()
  if (trimmedText.length === 0) {
    throw new Error('Le texte de la tâche ne peut pas être vide')
  }

  if (!['low', 'medium', 'high'].includes(priority)) {
    throw new Error('Priorité invalide')
  }

  return {
    id: generateId(),
    text: trimmedText,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}

export function addTask(tasks, task) {
  return [...tasks, task]
}

export function deleteTask(tasks, id) {
  return tasks.filter((task) => task.id !== id)
}

export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  )
}

export function filterTasks(tasks, filter) {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed)
    case 'completed':
      return tasks.filter((task) => task.completed)
    case 'all':
    default:
      return tasks
  }
}

export function clearCompleted(tasks) {
  return tasks.filter((task) => !task.completed)
}

export function countTasks(tasks) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const active = total - completed
  return { total, active, completed }
}

export function sortByPriority(tasks) {
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )
}

/**
 * Nouvelle feature TP4 :
 * Filtrer les tâches par priorité
 */
export function filterByPriority(tasks, priority) {
  if (priority === 'all') return tasks

  if (!['low', 'medium', 'high'].includes(priority)) {
    return tasks
  }

  return tasks.filter((task) => task.priority === priority)
}