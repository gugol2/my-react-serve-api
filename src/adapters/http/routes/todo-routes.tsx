import { Route, RouteGroup, Response, useRoute } from 'react-serve-js'
import { createApp } from '../../../create-app.js'

const app = createApp()
const { controller } = app

export const TodoRoutes = () => {
  return (
    <RouteGroup>
      {/* Get all todos */}
      <Route path='/todos' method='GET'>
        {async () => {
          const response = await controller.getAllTodos()
          return <Response status={response.status} json={response.body} />
        }}
      </Route>

      {/* Get todo by ID */}
      <Route path='/todos/:id' method='GET'>
        {async () => {
          const { params } = useRoute()
          const response = await controller.getTodoById({ params, body: {} })
          return <Response status={response.status} json={response.body} />
        }}
      </Route>

      {/* Create todo */}
      <Route path='/todos' method='POST'>
        {async () => {
          const { body } = useRoute()
          const response = await controller.createTodo({ params: {}, body })
          return <Response status={response.status} json={response.body} />
        }}
      </Route>

      {/* Update todo */}
      <Route path='/todos/:id' method='PUT'>
        {async () => {
          const { params, body } = useRoute()
          const response = await controller.updateTodo({ params, body })
          return <Response status={response.status} json={response.body} />
        }}
      </Route>

      {/* Delete todo */}
      <Route path='/todos/:id' method='DELETE'>
        {async () => {
          const { params } = useRoute()
          const response = await controller.deleteTodo({ params, body: {} })
          return <Response status={response.status} json={response.body} />
        }}
      </Route>
    </RouteGroup>
  )
}
