export const CREATE_NOTE = "CREATE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";

export function createNote(payload) {
  return { type: "CREATE_NOTE", payload };
}

export function updateNote(payload) {
  return { type: "UPDATE_NOTE", payload };
}
