import { Response, Route, RouteGroup, useRoute } from 'react-serve-js'

// Mock database (in real app, use a real database)
let todos = [
  { id: 1, title: 'Learn React', completed: false },
  { id: 2, title: 'Try react-serve', completed: false }
]

const findTodoById = (id: number) => {
  return todos.find(todo => todo.id === id)
}

const createNewTodo = (title: string) => {
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false
  }
  todos.push(newTodo)
  return newTodo
}

const findTodoIndexById = (id: string) => {
  return todos.findIndex(todo => todo.id === parseInt(id))
}

const editTodo = (todoIndex: number, body: any) => {
  todos[todoIndex] = { ...todos[todoIndex], ...body }
}

const deleteTodo = (todoIndex: number) => {
  todos.splice(todoIndex, 1)
}

export const TodoRoutes = () => {
  return (
    <RouteGroup>
      {/* Get all todos */}
      <Route path='/todos' method='GET'>
        {async () => {
          return <Response json={todos} />
        }}
      </Route>

      {/* Get single todo by ID */}
      <Route path='/todos/:id' method='GET'>
        {async () => {
          const { params } = useRoute()
          const todo = findTodoById(parseInt(params.id))

          return todo ? (
            <Response json={todo} />
          ) : (
            <Response status={404} json={{ error: 'Todo not found' }} />
          )
        }}
      </Route>

      {/* Create new todo */}
      <Route path='/todos' method='POST'>
        {async () => {
          const { body } = useRoute()

          const newTodo = createNewTodo(body.title)

          return <Response status={201} json={newTodo} />
        }}
      </Route>

      {/* Update todo */}
      <Route path='/todos/:id' method='PUT'>
        {async () => {
          const { params, body } = useRoute()
          const todoIndex = findTodoIndexById(params.id)

          if (todoIndex === -1) {
            return <Response status={404} json={{ error: 'Todo not found' }} />
          }

          editTodo(todoIndex, body)
          return <Response json={todos[todoIndex]} />
        }}
      </Route>

      {/* Delete todo */}
      <Route path='/todos/:id' method='DELETE'>
        {async () => {
          const { params } = useRoute()
          const todoIndex = findTodoIndexById(params.id)

          if (todoIndex === -1) {
            return <Response status={404} json={{ error: 'Todo not found' }} />
          }

          deleteTodo(todoIndex)
          return <Response status={204} json={null} />
        }}
      </Route>
    </RouteGroup>
  )
}
