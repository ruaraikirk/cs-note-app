import { combineReducers } from "redux";
import { CREATE_NOTE, UPDATE_NOTE } from "../actions";

const notes = (state = { allNotes: [] }, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      state = Object.assign({}, state, {
        allNotes: state.allNotes.concat(action.payload)
      });
      return state;
    case UPDATE_NOTE:
      let updatedNoteId = action.payload.id;
      let locateOutDatedNote = state.allNotes.find(n => {
        return n.id == updatedNoteId;
      });
      let updatedNote = action.payload;
      let currentNotesState = state.allNotes.slice(0);
      const savedNotes = [
        ...currentNotesState.slice(
          0,
          currentNotesState.indexOf(locateOutDatedNote)
        ),
        updatedNote,
        ...currentNotesState.slice(
          currentNotesState.indexOf(locateOutDatedNote) + 1
        )
      ];
      state = Object.assign({}, state, {
        allNotes: savedNotes
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
