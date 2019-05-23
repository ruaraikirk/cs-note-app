import { CREATE_NOTE, LOAD_ALL_NOTES } from "../actions/index";

function rootReducer(state = { allNotes: [] }, action) {
  if (action.type === CREATE_NOTE) {
    let newNote = action.payload;
    let oldState = state.allNotes.slice(0);
    return Object.assign({}, state, {
      allNotes: state.allNotes.concat(action.payload)
      //allNotes: [...oldState, newNote]
    });
  } else if (action.type === LOAD_ALL_NOTES) {
    return Object.assign({}, state, {
        allNotes: action.payload
      })
  }
  return state;
}

export default rootReducer;
