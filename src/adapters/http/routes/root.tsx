import { Response, Route } from 'react-serve-js'

export const RootRoutes = () => {
  return (
    <Route path='/' method='GET'>
      {async () => {
        return <Response json={{ message: 'Welcome to the API Root!' }} />
      }}
    </Route>
  )
}
