import anecdoteService from '../services/anecdotes'

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
    console.log('reducer', action.data)
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
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: 'VOTE', id: anecdote.id })
  }
}

export const anecdoteInitialization = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_ANECDOTES', data: anecdotes })
  }
}

export const anecdoteCreation = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({ type: 'NEW_ANECDOTE', data: newAnecdote })
  }
}

export default anecdoteReducer
