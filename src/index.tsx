import { App, Route, serve, Response } from 'react-serve-js'

function Backend () {
  return (
    <App port={6969} parseBody={true}>
      <Route path='/' method='GET'>
        {async () => {
          return <Response json={{ message: 'Welcome to the API Root!' }} />
        }}
      </Route>
    </App>
  )
}

serve(<Backend />)
