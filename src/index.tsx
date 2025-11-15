// import { App, Route, serve, Response } from 'react-serve-js'

import { createApp } from './create-app.js'
import { Todo, TodoStatus } from './domain/entities/todo.js'

// function Backend () {
//   return (
//     <App port={6969} parseBody={true}>
//       <Route path='/' method='GET'>
//         {async () => {
//           return <Response json={{ message: 'Welcome to the API Root!' }} />
//         }}
//       </Route>
//     </App>
//   )
// }

// serve(<Backend />)

// Example usage
const exampleUsage = async () => {
  const app = createApp()
  const { controller } = app

  // Create a todo
  console.log('Creating todo...')
  const createResponse = await controller.createTodo({
    params: {},
    body: {
      title: 'Learn Hexagonal Architecture',
      description: 'Study the principles of ports and adapters'
    }
  })
  console.log('Create response:', createResponse)

  // Get all todos
  console.log('\nGetting all todos...')
  const getAllResponse = await controller.getAllTodos()
  console.log('Get all response:', getAllResponse)

  // Get todo by ID
  if (createResponse.status === 201) {
    const todoId = (createResponse.body as Todo).id

    console.log('\nGetting todo by ID...')
    const getByIdResponse = await controller.getTodoById({
      params: { id: todoId },
      body: {}
    })
    console.log('Get by ID response:', getByIdResponse)

    // Update todo
    console.log('\nUpdating todo...')
    const updateResponse = await controller.updateTodo({
      params: { id: todoId },
      body: {
        status: 'completed' as TodoStatus
      }
    })
    console.log('Update response:', updateResponse)

    // Delete todo
    console.log('\nDeleting todo...')
    const deleteResponse = await controller.deleteTodo({
      params: { id: todoId },
      body: {}
    })
    console.log('Delete response:', deleteResponse)
  }
}

// Uncomment to run the example
exampleUsage()
