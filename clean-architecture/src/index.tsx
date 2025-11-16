import { App, Route, serve, Response } from 'react-serve-js'
import { TodoRoutes } from './frameworks/web/routes/todo-routes.js'
import { createApp } from './create-app.js'

const app = createApp()
const { controller } = app

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ message: 'Welcome to the API!' }} />
        }}
      </Route>
      <TodoRoutes controller={controller} />
    </App>
  )
}

serve(<Backend />)
