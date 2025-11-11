import { App, Response, Route, serve } from 'react-serve-js'
import { PostRoutes } from './posts.js'
import { UserRoutes } from './users.js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ message: 'Welcome to ReactServe!' }} />
        }}
      </Route>

      <UserRoutes />
      <PostRoutes />
    </App>
  )
}

serve(<Backend />)
