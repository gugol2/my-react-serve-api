import { App, serve } from 'react-serve-js'
import { PostRoutes } from './adapters/http/routes/post.js'
import { RootRoutes } from './adapters/http/routes/root.js'
import { UserRoutes } from './adapters/http/routes/user.js'
import { HealthRoutes } from './adapters/http/routes/health.js'
import { TodoRoutes } from './adapters/http/routes/todo.js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <RootRoutes />
      <HealthRoutes />
      <UserRoutes />
      <PostRoutes />
      <TodoRoutes />
    </App>
  )
}

serve(<Backend />)
