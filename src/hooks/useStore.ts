import { useReducer } from 'react';
import { type State, type Action, type Language, type FromLanguage } from '../types.d' 
import { AUTO_LANGUAGE } from '../constants';

// 1. create inital state
const initialState = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
  }
  
  //2 create reducer
  function reducer (state: State, action: Action) {
    const { type } = action
    if(type === 'INTERCHANGE_LANGUAGES') {
      if( state.fromLanguage === AUTO_LANGUAGE) return state
      const loading = state.fromText !== ''
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        result: '',
        loading
      }
    }
    if(type === 'SET_FROM_LANGUAGE') {
      if( state.fromLanguage === action.payload) return state
      const loading = state.fromText !== ''
      return {
        ...state,
        fromLanguage: action.payload,
        result: '',
        loading
      }
    }
    if(type === 'SET_TO_LANGUAGE') {
      if( state.toLanguage === action.payload) return state
      const loading = state.fromText !== ''
      return {
        ...state,
        toLanguage: action.payload,
        result: '',
        loading
      }
    }
    if(type === 'SET_FROM_TEXT') {
      const loading = action.payload !== ''
      return {
        ...state,
        fromText: action.payload,
        result: '',
        loading
      }
    }
    if(type === 'SET_RESULT') {
      return {
        ...state,
        result: action.payload
      }
    }
    return state
  }

  export function useStore () {
    // 3. use reducer
  const [{
    fromLanguage, 
    toLanguage, 
    fromText, 
    result, 
    loading}, dispatch] = useReducer(reducer, initialState)
    const interChangeLanguages = () => dispatch({type: 'INTERCHANGE_LANGUAGES'})
    const setFromLanguage = (payload: FromLanguage ) => dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    const setToLanguage = (payload: Language) => dispatch({type: 'SET_TO_LANGUAGE', payload})
    const setResult = (payload: string) => dispatch({type: 'SET_RESULT', payload})
    const setFromText = (payload: string) => { dispatch({ type: 'SET_FROM_TEXT', payload })}
    return {
        fromLanguage, 
        toLanguage, 
        fromText, 
        result, 
        loading,
        interChangeLanguages,
        setFromLanguage,
        setToLanguage,
        setResult,
        setFromText
    }
  }