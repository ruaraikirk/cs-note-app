import React from "react";
import "./App.css";

import NoteEditor from "./components/NoteEditor";
import NoteListContainer from "./components/noteList/NoteListContainer";

import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';
//import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import { Button } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayedNote: "new"
    };
  }

  componentDidMount() {
    this.setState({
      displayedNote: "new"
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notes.length != this.props.notes.length) {
      this.setState({
        displayedNote: "new"
      });
    }
  }

  selectNote = event => {
    let target_id = event.target.id;
    let selected = "";
    if (target_id != "new") {
      selected = this.props.notes.find(note => {
        return note.id === target_id;
      });
    } else {
      selected = "new";
    }
    this.setState({
      displayedNote: selected
    });
  };

  createNewNote = () => {
    this.setState({
      displayedNote: "new"
    });
  };

  render() {
    return (
      <Container>
  {/* Stack the columns on mobile by making one full-width and the other half-width */}
  <Row>
    <Col xs={12} md={8}>
      xs=12 md=8
    </Col>
    <Col xs={6} md={4}>
      xs=6 md=4
    </Col>
  </Row>
  </Container>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    notes: state.notes.allNotes,
    displayedNote: state.notes.displayedNote
  };
}

export default connect(mapStateToProps)(App);
