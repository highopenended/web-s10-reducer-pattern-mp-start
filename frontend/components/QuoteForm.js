import React, {useReducer} from 'react' // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
const initialState={
  authorName:"",
  quoteText:""
}

const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
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


// 👇 create your reducer function here

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

  // 👇 some props are missing in the JSX below:
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
