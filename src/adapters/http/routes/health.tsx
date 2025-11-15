import { Response, Route } from 'react-serve-js'

export const HealthRoutes = () => {
  return (
    <Route path='/health' method='GET'>
      {async () => {
        return <Response json={{ status: 'ok', timestamp: new Date() }} />
      }}
    </Route>
  )
}
