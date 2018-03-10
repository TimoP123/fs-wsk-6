import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.createAnecdote(content)
    e.target.anecdote.value = ''
    this.props.setNotification(`You created anecdote ${content}`)
    setTimeout(() => {
      this.props.setNotification('')
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm)

export default ConnectedAnecdoteForm
