import { Response, Route, RouteGroup, useRoute } from 'react-serve-js'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

export const UserRoutes = () => {
  return (
    <RouteGroup prefix='/users'>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ users }} />
        }}
      </Route>

      <Route path='/:id' method='GET'>
        {async () => {
          const { params } = useRoute()
          const user = users.find(u => u.id === Number(params.id))

          return user ? (
            <Response json={user} />
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
