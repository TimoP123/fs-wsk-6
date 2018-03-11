import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = async anecdote => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`You voted anecdote ${anecdote.content}`)
    await anecdoteService.updateAnecdote({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }

  render() {
    const { anecdotes } = this.props

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const filteredAnecdotes = (anecdotes, filter) => {
  let filtered = anecdotes
  console.log('list', filtered)
  filtered = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().match(filter.toLowerCase())
  )

  return filtered
}

const mapStateToProps = state => {
  return {
    anecdotes: filteredAnecdotes(state.anecdotes, state.filter)
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  setNotification
})(AnecdoteList)

export default ConnectedAnecdoteList
