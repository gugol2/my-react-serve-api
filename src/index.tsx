import { App, serve } from 'react-serve-js'
import { PostRoutes } from './posts.js'
import { RootRoutes } from './root.js'
import { UserRoutes } from './users.js'

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
