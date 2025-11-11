import { App, Route, Response, useRoute, serve } from 'react-serve-js'
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
    </App>
  )
}

serve(<Backend />)
