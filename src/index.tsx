import { App, serve } from 'react-serve-js'
import { PostRoutes } from './routes/posts.js'
import { RootRoutes } from './routes/root.js'
import { UserRoutes } from './routes/users.js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <RootRoutes />
      <UserRoutes />
      <PostRoutes />
    </App>
  )
}

serve(<Backend />)
