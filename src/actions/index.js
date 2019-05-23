export const CREATE_NOTE = "CREATE_NOTE";

export default function creatNote(payload) {
  return { type: "CREATE_NOTE", payload };
}