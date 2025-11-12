import { App, serve } from 'react-serve-js'
import { PostRoutes } from './routes/post.js'
import { RootRoutes } from './routes/root.js'
import { UserRoutes } from './routes/user.js'
import { HealthRoutes } from './routes/health.js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <RootRoutes />
      <HealthRoutes />
      <UserRoutes />
      <PostRoutes />
    </App>
  )
}

serve(<Backend />)
