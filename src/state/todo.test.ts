import { describe, it, expect, beforeEach } from 'vitest'
import { todos, findTodoById, createNewTodo, findTodoIndexById, editTodo, deleteTodo } from './todo.js'

describe('findTodoById', () => {
  it('should return todo when id exists', () => {
    const result = findTodoById(1)
    expect(result).toBeDefined()
    expect(result?.title).toBe('Learn React')
    expect(result?.completed).toBe(false)
  })

  it('should return todo for second id', () => {
    const result = findTodoById(2)
    expect(result).toBeDefined()
    expect(result?.title).toBe('Try react-serve')
    expect(result?.completed).toBe(false)
  })

  it('should return undefined when id does not exist', () => {
    const result = findTodoById(999)
    expect(result).toBeUndefined()
  })

  it('should return undefined for negative id', () => {
    const result = findTodoById(-1)
    expect(result).toBeUndefined()
  })

  it('should return undefined for zero id', () => {
    const result = findTodoById(0)
    expect(result).toBeUndefined()
  })
})

describe('createNewTodo', () => {
  let initialLength: number

  beforeEach(() => {
    initialLength = todos.length
  })

  it('should create a new todo with correct properties', () => {
    const title = 'Test todo'
    const newTodo = createNewTodo(title)

    expect(newTodo).toBeDefined()
    expect(newTodo.title).toBe(title)
    expect(newTodo.completed).toBe(false)
    expect(newTodo.id).toBe(initialLength + 1)
  })

  it('should add the new todo to the todos array', () => {
    const title = 'Another test todo'
    createNewTodo(title)

    expect(todos.length).toBe(initialLength + 1)
    expect(todos[todos.length - 1].title).toBe(title)
  })

  it('should handle empty title', () => {
    const newTodo = createNewTodo('')

    expect(newTodo.title).toBe('')
    expect(newTodo.completed).toBe(false)
  })
})

describe('findTodoIndexById', () => {
  it('should return correct index for existing todo', () => {
    const index = findTodoIndexById('1')
    expect(index).toBeGreaterThanOrEqual(0)
    expect(todos[index].id).toBe(1)
  })

  it('should return correct index for second todo', () => {
    const index = findTodoIndexById('2')
    expect(index).toBeGreaterThanOrEqual(0)
    expect(todos[index].id).toBe(2)
  })

  it('should return -1 when id does not exist', () => {
    const index = findTodoIndexById('999')
    expect(index).toBe(-1)
  })

  it('should parse string id to number', () => {
    const index = findTodoIndexById('1')
    expect(index).not.toBe(-1)
  })
})

describe('editTodo', () => {
  it('should update todo title', () => {
    const index = findTodoIndexById('1')
    const newTitle = 'Updated title'

    editTodo(index, { title: newTitle })

    expect(todos[index].title).toBe(newTitle)
  })

  it('should update todo completed status', () => {
    const index = findTodoIndexById('1')

    editTodo(index, { completed: true })

    expect(todos[index].completed).toBe(true)
  })

  it('should update multiple properties', () => {
    const index = findTodoIndexById('1')
    const updates = { title: 'New title', completed: true }

    editTodo(index, updates)

    expect(todos[index].title).toBe(updates.title)
    expect(todos[index].completed).toBe(updates.completed)
  })

  it('should preserve unchanged properties', () => {
    const index = findTodoIndexById('1')
    const originalId = todos[index].id

    editTodo(index, { title: 'Changed title' })

    expect(todos[index].id).toBe(originalId)
  })
})

describe('deleteTodo', () => {
  it('should remove todo at given index', () => {
    const initialLength = todos.length
    const index = findTodoIndexById('1')
    const todoId = todos[index].id

    deleteTodo(index)

    expect(todos.length).toBe(initialLength - 1)
    expect(findTodoById(todoId)).toBeUndefined()
  })

  it('should maintain array integrity after deletion', () => {
    const initialLength = todos.length
    const lastTodo = todos[todos.length - 1]
    const index = 0

    deleteTodo(index)

    expect(todos.length).toBe(initialLength - 1)
    expect(todos[todos.length - 1]).toEqual(lastTodo)
  })
})
