import { combineReducers } from 'redux';
import { CREATE_NOTE } from '../actions'

const notes = (state = { allNotes: [] }, action) => {
  switch(action.type) {
    case CREATE_NOTE:
      state = Object.assign({}, state, {
        allNotes: state.allNotes.concat(action.payload)
      });
      return state;
    default:
    return state;

  }

};

const rootReducer = combineReducers({
  notes
  // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
});

export default rootReducer;

/*
import { CREATE_NOTE } from "../actions/index";

function rootReducer(state = { allNotes: [] }, action) {
  if (action.type === CREATE_NOTE) {
    let newNote = action.payload;
    let oldState = state.allNotes.slice(0);
    return Object.assign({}, state, {
      allNotes: state.allNotes.concat(action.payload)
      //allNotes: [...oldState, newNote]
    });
  } 
  return state;
}

export default rootReducer;
*/