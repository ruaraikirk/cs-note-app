import React from "react";
import "./App.css";

import NoteEditor from "./components/NoteEditor";
import NoteListContainer from "./components/noteList/NoteListContainer";

import { connect } from "react-redux";

import Button from 'react-bootstrap/Button';

import {
  Container, Row, Col, Form, Input, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

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
    <div>
      <Container className="App-header">
        <Row>
          <Col xs={6} md={8}><h3>🗒️ Notes</h3></Col>
          <Col xs={6} md={4}><Button variant="outline-primary" onClick={this.createNewNote} style={{float: 'right', cursor: 'pointer'}}>+ Create</Button></Col>
        </Row>
      </Container>
      <Container style={{height: '100vh'}}>
          <Row style={{height: '100%'}} >
            <Col lg={4} md={3}><NoteListContainer selectNote={this.selectNote} /></Col>
            <Col lg={8} md={9}><NoteEditor displayedNote={this.state.displayedNote}/></Col>
          </Row>
      </Container>
    </div>
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
