import { Response, Route, RouteGroup, useRoute } from 'react-serve-js'
import {
  createNewTodo,
  deleteTodo,
  editTodo,
  findTodoById,
  findTodoIndexById,
  getAllTodos
} from '../domain/todo.js'

export const TodoRoutes = () => {
  return (
    <RouteGroup>
      {/* Get all todos */}
      <Route path='/todos' method='GET'>
        {async () => {
          const todos = getAllTodos()
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
          const todos = getAllTodos()
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

          try {
            deleteTodo(todoIndex)
            return <Response status={204} json={null} />
          } catch (error) {
            return (
              <Response
                status={500}
                json={{
                  error: `Failed to delete todo: ${todoIndex}`,
                  errorMessage: (error as Error).message
                }}
              />
            )
          }
        }}
      </Route>
    </RouteGroup>
  )
}
