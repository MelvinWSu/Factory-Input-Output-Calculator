import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

//React
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

//firebase database
import { getDatabase, ref, set, push } from "firebase/database";

//firebase auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence
} from "firebase/auth";
import fire from "./fire.js"

//Global variables
const auth = getAuth()

export default class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      title: "Example Title",
      result: '',
      inputs: ['', ''],
      outputs: [''],
      crafting_time: null,
      crafting_time_units: null,
      login: null,
      edit_mode: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        this.setState({ login: user.email })
      }
    });
  }

  setState(state) {
    window.localStorage.setItem('state', JSON.stringify(this.state));
    super.setState(state);
  }

  createInputEntry() {
    return this.state.inputs.map(({ name, flow, flow_units, needed }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Input #{i}</span>
          <Button class="text-right" value='remove' onClick={this.removeClick.bind(this, i, "input")}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input autoComplete="off" type="text" name="name" value={name || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Flow</span>
            </div>
            <input autoComplete="off" type="number" name="flow" value={flow || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
            <span class="input-group-text" id="basic-addon">per</span>
            <select class="form-select" name="flow_units" value={flow_units || ''} onChange={this.handleChange.bind(this, i, "input")}>
              <option >Choose...</option>
              <option value="1">Miliseconds</option>
              <option value="2" >Seconds</option>
              <option value="3">Minutes</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon"># Needed</span>
            <input autoComplete="off" type="number" name="needed" value={needed || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
          </div>
        </div>
      </div>
    )
  }

  createOutputEntry() {
    return this.state.outputs.map(({ output_name, output_quanity }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Output #{i}</span>
          <Button class="text-right " value='remove' onClick={this.removeClick.bind(this, i, "output")}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input autoComplete="off" type="text" name="output_name" value={output_name || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Quantity</span>
            </div>
            <input autoComplete="off" type="number" name="output_quanity" value={output_quanity || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
          </div>
        </div>
      </div>
    )
  }

  handleChange(i, form_type, event) {
    const { name, value } = event.target;
    if (form_type === "input") {
      const inputs = [...this.state.inputs];
      inputs[i] = { ...inputs[i], [name]: value };
      this.setState({ inputs });
    }
    else if (form_type === "output") {
      const outputs = [...this.state.outputs];
      outputs[i] = { ...outputs[i], [name]: value };
      this.setState({ outputs });
    }
    else {
      this.setState({ [name]: value })
    }
  }

  addClick(form_type) {
    if (form_type === "input") { this.setState(prevState => ({ inputs: [...prevState.inputs, ''] })) }
    else if (form_type === "output") { this.setState(prevState => ({ outputs: [...prevState.outputs, ''] })) }
  }

  removeClick(i, form_type) {
    if (form_type === "input") {
      let inputs = [...this.state.inputs];
      inputs.splice(i, 1);
      this.setState({ inputs });
    }
    else if (form_type === "output") {
      let outputs = [...this.state.outputs];
      outputs.splice(i, 1);
      this.setState({ outputs });
    }
  }
  //todo: add proper calculations, iterate through output array, get specific inputs that cause bottleneck
  //todo: add proper check for field inputs, factor time units
  handleSubmit(event) {
    this.state.inputs.forEach(element => alert("Input: " + element.name + ' ' + element.flow + ' ' + element.flow_units + ' ' + element.needed));
    alert("crafting_time: " + this.state.crafting_time + ' ' + this.state.crafting_time_units)
    this.state.outputs.forEach(element => alert("Output: " + element.output_name + ' ' + element.output_quanity));
    var [input_array, output_array] = [this.state.inputs, this.state.outputs];
    if (input_array.every(element => element.flow > this.state.crafting_time)) {
      console.log("output crafting too slow")
      this.setState({ result: "output crafting too slow" });
    }
    else if (input_array.some(element => element.flow < this.state.crafting_time)) {
      console.log("an input has too few flow")
      this.setState({ result: "an input has too few flow" })
    }
    else {
      console.log("all good")
      this.setState({ result: "all good" })
    }

    event.preventDefault();
  }

  //todo: add login check
  //todo: add proper check for field inputs
  //todo: get firebase key to allow updating instead of pushing
  uploadToFirebase() {
    const user = auth.currentUser;
    const db = getDatabase();

    push(ref(db, 'users/' + user.uid), {
      title: this.state.title,
      inputs: this.state.inputs,
      outputs: this.state.outputs,
      crafting_time: this.state.crafting_time,
      crafting_time_units: this.state.crafting_time_units
    });
    alert("Save successful")
  }

  logout_function() {
    auth.signOut().then(window.location.reload())
  }

  render_dropdown() {
    const user = auth.currentUser;
    if (user !== null) {
      return (
        <NavDropdown.Item onClick={this.logout_function.bind(this)}>Logout</NavDropdown.Item>
      )
    }
    else {
      return (
        <NavDropdown.Item href="/signin">Login</NavDropdown.Item>
      )
    }
  }

  title_edit() {
    if (this.state.edit_mode) {
      return (
        <div class="col-12">
          <div>
            <input autoComplete="off" name="title" value={this.state.title || ''} onChange={this.handleChange.bind(this, 0, "title")}></input>
            <Button value='save' onClick={this.end_title_edit.bind(this)}>Save</Button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div class="col-12">
          <div>
            <h1 class="header">{this.state.title}</h1>
            <Button value='edit' onClick={this.start_title_edit.bind(this)}>Edit</Button>
          </div>
        </div>
      )
    }
  }
  start_title_edit() {
    this.setState({ edit_mode: true })
  }

  end_title_edit() {
    this.setState({ edit_mode: false })
  }

  check_local_storage() {
    console.log(JSON.parse(localStorage.getItem("state")))
  }

  clear_local_storage() {
    window.localStorage.clear();
    console.log(JSON.parse(localStorage.getItem("state")))
  }

  //todo, fix remove button spacing
  render() {
    return (
      ///Navbar
      <Container>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Factory I/O Calculator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <form class="form-inline my-2 my-lg-0">
                <NavDropdown title={this.state.login} id="basic-nav-dropdown">
                  <NavDropdown.Item >Account</NavDropdown.Item>
                  <NavDropdown.Item >Save As</NavDropdown.Item>
                  <NavDropdown.Item >Load</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {this.render_dropdown()}
                </NavDropdown>
              </form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div class="row">
          {this.title_edit()}
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.createInputEntry()}
          <div class="row">
            <div class="col-12">
              <Button value='addinput' class="btn-success" onClick={this.addClick.bind(this, "input")}>Add Input</Button>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Crafting Time</span>
                </div>
                <input autoComplete="off" type="number" name="crafting_time" value={this.state.crafting_time || ''} onChange={this.handleChange.bind(this, 0, "crafting_time")} required></input>
                <select class="form-select" name="crafting_time_units" value={this.state.crafting_time_units || ''} onChange={this.handleChange.bind(this, 0, "crafting_time_units")}>
                  <option>Choose...</option>
                  <option value="1">Miliseconds</option>
                  <option value="2">Seconds</option>
                  <option value="3">Minutes</option>
                </select>
              </div>
            </div>
          </div>
          {this.createOutputEntry()}
          <div class="row">
            <div class="col-12">
              <Button value='addoutput' onClick={this.addClick.bind(this, "output")}>Add Output</Button>
            </div>
          </div>
          <Button type="submit" value="Submit">Calculate</Button>
          <Button onClick={this.uploadToFirebase.bind(this)}>Save to Firebase</Button>
        </form>
        <hr></hr>
        <div class="row">
          <div class="col-12">
            <span class="h4">Result</span>
          </div>
          <div class="col-12">
            {this.state.result}
          </div>
        </div>
        <Button onClick={this.check_local_storage.bind(this)}>Check local storage</Button>
        <Button onClick={this.clear_local_storage.bind(this)}>Clear local storage</Button>
      </Container>
    );
  }
}