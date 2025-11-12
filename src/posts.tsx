import {
  Middleware,
  Response,
  Route,
  RouteGroup,
  useRoute
} from 'react-serve-js'
import { loggingMiddleware } from './middleware/loggingMiddleware.js'

const dbPosts = [
  { id: 1, title: 'First Post', content: 'This is the first post.', userId: 1 },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post.',
    userId: 1
  }
]

const searchPosts = (query: string) => {
  return query
    ? dbPosts.filter(
        post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase())
      )
    : dbPosts
}

const findPostById = (id: number) => {
  return dbPosts.find(post => post.id === id)
}

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
