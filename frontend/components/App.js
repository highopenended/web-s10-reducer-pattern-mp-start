import React, {useReducer} from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes
const quotes = [
  {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  },
]

// 👇 create your initial state object here
const initialState={
  displayAllQuotes:true,
  highlightedQuote:null,
  quotes:quotes
}



const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
  switch(action.type){
    case CREATE_QUOTE:
      return {
        ...state,
        quotes : [...state.quotes, action.payload]
      }  
    case DELETE_QUOTE:
      return { ...state, quotes : state.quotes.filter(quote => quote.id !== action.payload)}
    case EDIT_QUOTE_AUTHENTICITY:
      return {...state, quotes: state.quotes.map(quote => quote.id === action.payload ? {...quote,apocryphal:!quote.apocryphal} : {...quote})}
    case SET_HIGHLIGHTED_QUOTE:
      return {...state, highlightedQuote:action.payload}
    case TOGGLE_VISIBILITY:
      return {...state,displayAllQuotes:!state.displayAllQuotes}
  }
}

export default function App() {
  const [state, dispatch]=useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    let newQuote={
      id: getNextId(),
      quoteText: quoteText,
      authorName: authorName,
      apocryphal: false,
    }
    dispatch({type:CREATE_QUOTE, payload : newQuote})
  }
  const deleteQuote = id => { dispatch({type:DELETE_QUOTE, payload:id}) }
  const editQuoteAuthenticity = id => {dispatch({type:EDIT_QUOTE_AUTHENTICITY, payload:id})}
  const setHighlightedQuote = id => { dispatch({type:SET_HIGHLIGHTED_QUOTE, payload:id}) }
  const toggleVisibility = () => { dispatch({type:TOGGLE_VISIBILITY, payload:id}) }

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes    
        quotes={state.quotes}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
        deleteQuote={(id)=>deleteQuote(id)}
        editQuoteAuthenticity={(id)=>editQuoteAuthenticity(id)}
        setHighlightedQuote={(id)=>setHighlightedQuote(id)}
        toggleVisibility={()=>toggleVisibility()}
      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}
