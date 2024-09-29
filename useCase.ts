const api = createFetchUtil({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'X-API-Key': 'your-api-key-here',
  },
})

// GET request
const getData = async () => {
  const data = await api<{ id: number; name: string }[]>('/users')
  console.log(data)
}

// POST request with authorization
interface UserData {
  name: string
  email: string
}

const createUser = async (userData: UserData) => {
  const token = 'your-auth-token'
  const newUser = await api<{ id: number; name: string; email: string }, UserData>('/users', {
    method: 'POST',
    headers: {
      ...withAuth(token),
    },
    body: userData,
  })
  console.log(newUser)
}

// GET request with query parameters
const searchUsers = async (query: string) => {
  const users = await api<{ id: number; name: string }[]>('/users', {
    params: { search: query },
  })
  console.log(users)
}

// PUT request
interface UpdateUserData {
  name?: string
  email?: string
}

const updateUser = async (id: number, userData: UpdateUserData) => {
  const updatedUser = await api<{ id: number; name: string; email: string }, UpdateUserData>(`/users/${id}`, {
    method: 'PUT',
    body: userData,
  })
  console.log(updatedUser)
}

// DELETE request
const deleteUser = async (id: number) => {
  await api<void>(`/users/${id}`, { method: 'DELETE' })
  console.log(`User ${id} deleted`)
}
