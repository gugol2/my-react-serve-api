import { App, Route, serve, Response } from 'react-serve-js'
import { TodoRoutes } from './adapters/http/routes/todo-routes.js'

function Backend() {
  return (
    <App port={6969} parseBody={true}>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ message: 'Welcome to the API!' }} />
        }}
      </Route>
      <TodoRoutes />
    </App>
  )
}

serve(<Backend />)
