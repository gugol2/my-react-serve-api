import { App, serve } from 'react-serve-js'
import { RootRoutes } from './adapters/http/routes/root.js'
import { TodoRoutes } from './adapters/http/routes/todo.js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <RootRoutes />
      <TodoRoutes />
    </App>
  )
}

serve(<Backend />)
