import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    console.log('form', content)
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
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
  anecdoteCreation,
  setNotification
})(AnecdoteForm)

export default ConnectedAnecdoteForm
