const dbUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
]

const searchUsers = (query: string) => {
  return query
    ? dbUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
    : dbUsers
}

const findUserById = (id: number) => {
  return dbUsers.find(user => user.id === id)
}

export { searchUsers, findUserById }
