import {
  Response,
  Route,
  RouteGroup,
  useContext,
  useRoute
} from 'react-serve-js'
import { requestTimingMiddleware } from './middleware/requestTimingMiddleware'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const searchUsers = (query: string) => {
  return users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  )
}

export const UserRoutes = () => {
  return (
    <RouteGroup prefix='/users'>
      <Route path='/' method='GET'>
        {async () => {
          const { query } = useRoute()
          if (query.q) {
            return <Response json={{ users: searchUsers(query.q) }} />
          }
          return <Response json={{ users }} />
        }}
      </Route>

      <Route path='/:id' method='GET' middleware={requestTimingMiddleware}>
        {async () => {
          const { params } = useRoute()
          const user = users.find(u => u.id === Number(params.id))

          const startTime = useContext('startTime')
          const duration = Date.now() - startTime

          return user ? (
            <Response
              json={{ user: user, meta: { duration: `${duration} ms` } }}
            />
          ) : (
            <Response
              status={404}
              json={{ error: `User with id ${params.id} not found` }}
            />
          )
        }}
      </Route>
    </RouteGroup>
  )
}
