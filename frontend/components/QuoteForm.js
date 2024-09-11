import React, {useReducer} from 'react' 

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const initialState={
  authorName:"",
  quoteText:""
}

const reducer = (state, action) => {
  switch(action.type){
    case CHANGE_INPUT:
      {action.payload.name} 
      return action.payload.name === 'authorName' 
      ? { ...state, authorName:action.payload.value}
      : { ...state, quoteText:action.payload.value}
    case RESET_FORM:
      return { ...initialState }
  }
}

export default function TodoForm({ createQuote = () => { } }) {
  const [state, dispatch]=useReducer(reducer, initialState)

  const onChange = (e) => {
    dispatch({type:CHANGE_INPUT, payload:e.target})
  }
  const resetForm = () => {
    dispatch({type:RESET_FORM})
  }
  const onNewQuote = (e) => {
    e.preventDefault()
    createQuote(state)
    resetForm()
  }

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          placeholder='type author name'
          value={state.authorName}
          onChange={onChange}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          value={state.quoteText}
          onChange={onChange}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          onClick={onNewQuote}
          role='submit'
        >DO IT!</button>
      </label>
    </form>
  )
}
