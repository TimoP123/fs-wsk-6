import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  handleVote = anecdote => {
    this.props.voteAnecdote(anecdote.id)
    this.props.setNotification(`You voted anecdote ${anecdote.content}`)
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }

  render() {
    const { anecdotes } = this.props

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .filter(a => a.content.includes(this.props.filter))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
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

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
  voteAnecdote,
  setNotification
})(AnecdoteList)

export default ConnectedAnecdoteList
