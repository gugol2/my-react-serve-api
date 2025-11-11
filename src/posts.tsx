import {
  Middleware,
  Response,
  Route,
  RouteGroup,
  useRoute
} from 'react-serve-js'
import { loggingMiddleware } from './middleware/loggingMiddleware'

const posts = [
  { id: 1, title: 'First Post', content: 'This is the first post.', userId: 1 },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post.',
    userId: 1
  }
]

const searchPosts = (query: string) => {
  return posts.filter(
    post =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
  )
}

export const PostRoutes = () => {
  return (
    <RouteGroup prefix='/posts'>
      <Middleware use={loggingMiddleware} />

      <Route path='/' method='GET'>
        {async () => {
          const { query } = useRoute()
          if (query.q) {
            return <Response json={{ posts: searchPosts(query.q) }} />
          }
          return <Response json={{ posts }} />
        }}
      </Route>
      <Route path='/:id' method='GET'>
        {async () => {
          const { params } = useRoute()
          const post = posts.find(p => p.id === Number(params.id))

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
