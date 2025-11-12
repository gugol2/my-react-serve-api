import {
  Response,
  Route,
  RouteGroup,
  useContext,
  useRoute
} from 'react-serve-js'
import { requestTimingMiddleware } from './middleware/requestTimingMiddleware.js'

const dbUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const searchUsers = (query: string) => {
  return query
    ? dbUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
    : dbUsers
}

const findUserById = (id: number) => {
  return dbUsers.find(user => user.id === id)
}

export const UserRoutes = () => {
  return (
    <RouteGroup prefix='/users'>
      <Route path='/' method='GET'>
        {async () => {
          const { query } = useRoute()
          return <Response json={{ users: searchUsers(query.q) }} />
        }}
      </Route>

      <Route path='/:id' method='GET' middleware={requestTimingMiddleware}>
        {async () => {
          const { params } = useRoute()
          const user = findUserById(Number(params.id))

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
