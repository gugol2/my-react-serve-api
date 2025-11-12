import { App, Response, Route, serve, RouteGroup } from 'react-serve-js'

export function createTestServer (Routes?: typeof RouteGroup) {
  function Backend () {
    return (
      <App port={0} parseBody={true}>
        <Route path='/' method='GET'>
          {async () => {
            return <Response json={{ message: 'Welcome to ReactServe!' }} />
          }}
        </Route>

        {Routes ? <Routes children={undefined} /> : null}
      </App>
    )
  }

  return serve(<Backend />)
}
