import { Response, Route, RouteGroup } from 'react-serve-js'

export const RootRoutes = () => {
  return (
    <RouteGroup prefix='/'>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ message: 'Welcome to the API Root!' }} />
        }}
      </Route>
    </RouteGroup>
  )
}
