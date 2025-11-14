import {
  Response,
  Route,
  RouteGroup,
  useContext,
  useRoute
} from 'react-serve-js'
import { requestTimingMiddleware } from '../middleware/requestTimingMiddleware.js'
import { searchUsers, findUserById } from '../aplication/user.js'

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
          const durationStr = `${duration} ms`

          return user ? (
            <Response json={{ user: user, meta: { duration: durationStr } }} />
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
