const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {
    return [...store, { content: action.content, id: getId(), votes: 0 }]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }
  if (action.type === 'NEW_ANECDOTE') {
    return [
      ...store,
      { content: action.data.content, id: action.data.id, votes: 0 }
    ]
  }

  return store
}

export const createAnecdote = content => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export const anecdoteCreation = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export default anecdoteReducer
