export const CREATE_NOTE = "CREATE_NOTE";
export const LOAD_ALL_NOTES = 'LOAD_ALL_NOTES'

export function creatNote(payload) {
  return { type: "CREATE_NOTE", payload };
}

export function loadAllNotes() {
  return { type: "CREATE_NOTE", allNotes };
}
