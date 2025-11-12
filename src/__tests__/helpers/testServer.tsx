import { JSX } from 'react'
import { App, serve } from 'react-serve-js'

export function createTestServer (Routes: () => JSX.Element) {
  function Backend () {
    return (
      <App port={0} parseBody={true}>
        <Routes />
      </App>
    )
  }

  return serve(<Backend />)
}
