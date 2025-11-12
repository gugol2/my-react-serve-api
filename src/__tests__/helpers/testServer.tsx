import { App, RouteGroup, serve } from 'react-serve-js'

export function createTestServer (Routes: typeof RouteGroup) {
  function Backend () {
    return (
      <App port={0} parseBody={true}>
        <Routes children={undefined} />
      </App>
    )
  }

  return serve(<Backend />)
}
