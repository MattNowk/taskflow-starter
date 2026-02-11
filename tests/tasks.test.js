import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  createTask,
  addTask,
  deleteTask,
  toggleTask,
  filterTasks,
  clearCompleted,
  countTasks,
  loadTasks,
  saveTasks,
  sortByPriority,
} from '../src/tasks.js'

describe('Module tasks.js', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('createTask', () => {
    it('crée une tâche avec propriétés par défaut', () => {
      const task = createTask('Ma nouvelle tâche')

      expect(task).toHaveProperty('id')
      expect(task.text).toBe('Ma nouvelle tâche')
      expect(task.priority).toBe('medium')
      expect(task.completed).toBe(false)
      expect(task).toHaveProperty('createdAt')
    })

    it('trim le texte', () => {
      const task = createTask('   Hello   ')
      expect(task.text).toBe('Hello')
    })

    it('accepte une priorité personnalisée', () => {
      const task = createTask('Urgent', 'high')
      expect(task.priority).toBe('high')
    })

    it('throw si texte manquant / pas string', () => {
      expect(() => createTask('')).toThrow('Le texte de la tâche est requis')
      expect(() => createTask(null)).toThrow('Le texte de la tâche est requis')
      expect(() => createTask(42)).toThrow('Le texte de la tâche est requis')
    })

    it('throw si texte uniquement espaces', () => {
      expect(() => createTask('   ')).toThrow('Le texte de la tâche ne peut pas être vide')
    })

    it('throw si priorité invalide', () => {
      expect(() => createTask('Test', 'invalid')).toThrow('Priorité invalide')
    })
  })

  describe('addTask', () => {
    it('ajoute une tâche à la liste', () => {
      const tasks = []
      const t = createTask('Test')
      const result = addTask(tasks, t)

      expect(result).toHaveLength(1)
      expect(result[0].text).toBe('Test')
    })

    it('ne mute pas la liste originale', () => {
      const tasks = []
      const t = createTask('Test')
      const result = addTask(tasks, t)

      expect(tasks).toHaveLength(0)
      expect(result).toHaveLength(1)
    })
  })

  describe('deleteTask', () => {
    it('supprime une tâche existante', () => {
      const t1 = createTask('T1')
      const t2 = createTask('T2')
      const tasks = [t1, t2]

      const result = deleteTask(tasks, t1.id)
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(t2.id)
    })

    it("ne change rien si l'id n'existe pas", () => {
      const t1 = createTask('T1')
      const tasks = [t1]

      const result = deleteTask(tasks, 'fake-id')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe(t1.id)
    })
  })

  describe('toggleTask', () => {
    it("bascule l'état completed", () => {
      const t1 = createTask('T1')
      const tasks = [t1]

      const r1 = toggleTask(tasks, t1.id)
      expect(r1[0].completed).toBe(true)

      const r2 = toggleTask(r1, t1.id)
      expect(r2[0].completed).toBe(false)
    })
  })

  describe('filterTasks', () => {
    it('filtre all/active/completed', () => {
      const t1 = createTask('Active')
      const t2 = createTask('Done')
      t2.completed = true
      const tasks = [t1, t2]

      expect(filterTasks(tasks, 'all')).toHaveLength(2)
      expect(filterTasks(tasks, 'active')).toHaveLength(1)
      expect(filterTasks(tasks, 'completed')).toHaveLength(1)
    })

    it('default -> all', () => {
      const t1 = createTask('X')
      expect(filterTasks([t1], 'unknown')).toHaveLength(1)
    })
  })

  describe('clearCompleted', () => {
    it('retire toutes les tâches terminées', () => {
      const t1 = createTask('A')
      const t2 = createTask('B')
      t2.completed = true

      const result = clearCompleted([t1, t2])
      expect(result).toHaveLength(1)
      expect(result[0].text).toBe('A')
    })
  })

  describe('countTasks', () => {
    it('compte correctement', () => {
      const t1 = createTask('Active')
      const t2 = createTask('Done')
      t2.completed = true

      expect(countTasks([t1, t2])).toEqual({ total: 2, active: 1, completed: 1 })
    })

    it('zéro si liste vide', () => {
      expect(countTasks([])).toEqual({ total: 0, active: 0, completed: 0 })
    })
  })

  describe('sortByPriority', () => {
    it('trie high > medium > low', () => {
      const low = createTask('L', 'low')
      const high = createTask('H', 'high')
      const med = createTask('M', 'medium')

      const sorted = sortByPriority([low, high, med])
      expect(sorted.map((t) => t.priority)).toEqual(['high', 'medium', 'low'])
    })
  })

  describe('Storage', () => {
    it('sauvegarde et recharge', () => {
      const t = createTask('Storage Test')
      saveTasks([t])

      const loaded = loadTasks()
      expect(loaded).toHaveLength(1)
      expect(loaded[0].text).toBe('Storage Test')
    })

    it('retourne [] si JSON invalide', () => {
      localStorage.setItem('taskflow-tasks', 'invalid json')
      expect(loadTasks()).toEqual([])
    })

    it("n'explose pas si localStorage.setItem throw", () => {
      const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('boom')
      })
      expect(() => saveTasks([{ a: 1 }])).not.toThrow()
      spy.mockRestore()
    })
  })
})