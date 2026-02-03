/**
 * Tests pour le module tasks.js
 *
 * OBJECTIF JOUR 3 : Atteindre une couverture de code >= 70%
 *
 * Tests existants : 2 (exemple)
 * Tests à ajouter : ~5-8 pour atteindre 70%
 */

import { describe, it, expect } from 'vitest'
import { createTask, addTask, deleteTask } from '../src/tasks.js'

describe('createTask', () => {
  it('devrait créer une tâche avec les propriétés par défaut', () => {
    const task = createTask('Ma nouvelle tâche')

    expect(task).toHaveProperty('id')
    expect(task.text).toBe('Ma nouvelle tâche')
    expect(task.priority).toBe('medium')
    expect(task.completed).toBe(false)
    expect(task).toHaveProperty('createdAt')
  })

  it('devrait créer une tâche avec une priorité personnalisée', () => {
    const task = createTask('Tâche urgente', 'high')

    expect(task.priority).toBe('high')
  })

  // TODO Jour 3 : Ajouter des tests pour les cas d'erreur
  // - texte vide
  // - texte null/undefined
  // - priorité invalide
})

describe('addTask', () => {
  it('devrait ajouter une tâche à la liste', () => {
    const tasks = []
    const newTask = createTask('Test')

    const result = addTask(tasks, newTask)

    expect(result).toHaveLength(1)
    expect(result[0].text).toBe('Test')
  })

  // TODO Jour 3 : Ajouter des tests
  // - ajouter à une liste non vide
  // - vérifier l'immutabilité
})

describe('deleteTask', () => {
  // TODO Jour 3 : Implémenter les tests
  // - supprimer une tâche existante
  // - supprimer une tâche inexistante
  // - vérifier l'immutabilité
})

// TODO Jour 3 : Ajouter des tests pour :
// - toggleTask
// - filterTasks
// - clearCompleted
// - countTasks
// - sortByPriority
