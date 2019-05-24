import React from "react";
import logo from "./logo.svg";
import "./App.css";

import NoteEditor from "./components/NoteEditor";
import NoteListContainer from "./components/noteList/NoteListContainer";

import { connect } from "react-redux";

class App extends React.Component {
  constructor(props) {
		super(props)

		this.state = {
			displayedNote: "new",
		}
	}

	componentDidMount() {
		this.setState({
			displayedNote: "new"
		})
	}

	componentDidUpdate(prevProps, prevState) {
/*
		if (prevProps.notes.length != this.props.notes.length) {
			this.setState({
				displayedNote: "new"
			})
    }
*/
	}

	selectNote = (event) => {
    console.log('NOTE SELECTED')
    console.log(typeof event.target.id, "Target ID: " + event.target.id)
		let target_id = event.target.id
		let selected = ""
		if (target_id != "new") {
      selected = this.props.notes.find(x => x.id === target_id)
      console.log("Selected: ", selected)
			/*selected =  this.props.notes.find((note) => {
				return note.id == target_id
			})*/
		} else {
			selected = "new"
		}
		this.setState({
			displayedNote: selected
		})

  }
  
  render() {
    return (
      <div>
        CS NOTES
        <div>
          <NoteEditor displayedNote={this.state.displayedNote}/>
        </div>
        <div>
          <p>NOTE LIST CONTAINER</p>
          <NoteListContainer selectNote={this.selectNote}/>
        </div>
      </div>
    );
  }
}

//export default App;
function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
		displayedNote: state.notes.displayedNote
  }
}

export default connect(mapStateToProps)(App)