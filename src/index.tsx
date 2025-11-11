import { App, Response, Route, serve } from 'react-serve-js'
import { PostRoutes } from './posts'
import { UserRoutes } from './users'

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
