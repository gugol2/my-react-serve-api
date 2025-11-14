import {
  Middleware,
  Response,
  Route,
  RouteGroup,
  useRoute
} from 'react-serve-js'
import { loggingMiddleware } from '../middleware/loggingMiddleware.js'
import { findPostById, searchPosts } from '../aplication/post.js'

export const PostRoutes = () => {
  return (
    <RouteGroup prefix='/posts'>
      <Middleware use={loggingMiddleware} />

      <Route path='/' method='GET'>
        {async () => {
          const { query } = useRoute()
          return <Response json={{ posts: searchPosts(query.q) }} />
        }}
      </Route>
      <Route path='/:id' method='GET'>
        {async () => {
          const { params } = useRoute()
          const post = findPostById(Number(params.id))

          return post ? (
            <Response json={post} />
          ) : (
            <Response
              status={404}
              json={{ error: `Post with id ${params.id} not found` }}
            />
          )
        }}
      </Route>
    </RouteGroup>
  )
}
