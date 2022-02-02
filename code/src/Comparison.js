import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default class Comparison extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: '',
      inputs: [],
      outputs: [],
      crafting_time: null,
      crafting_time_units: null,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //todo: add page memory (for refreshing the page), add default input/output count
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
            <input autocomplete="off" type="text" name="name" value={name || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Flow</span>
            </div>
            <input autocomplete="off" type="number" name="flow" value={flow || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
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
            <input autocomplete="off" type="number" name="needed" value={needed || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
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
          <Button class="text-right" value='remove' onClick={this.removeClick.bind(this, i, "output")}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input autocomplete="off" type="text" name="output_name" value={output_name || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Quantity</span>
            </div>
            <input autocomplete="off" type="number" name="output_quanity" value={output_quanity || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
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
  //add proper checks for no input or no output, factor time units
  handleSubmit(event) {
    this.state.inputs.forEach(element => alert("Input: " + element.name + ' ' + element.flow + ' ' + element.flow_units + ' ' + element.needed));
    alert("crafting_time: " + this.state.crafting_time + ' ' + this.state.crafting_time_units)
    this.state.outputs.forEach(element => alert("Output: " + element.output_name + ' ' + element.output_quanity));
    var [input_array, output_array] = [this.state.inputs, this.state.outputs];
    if (input_array.every(element => element.flow > this.state.crafting_time)) {
      console.log("output crafting too slow")
      this.setState({ result: "output crafting too slow" });
    }
    else if (input_array.some(element => element.flow <  this.state.crafting_time)) {
      console.log("an input has too few flow")
      this.setState({ result: "an input has too few flow" })
    }
    else {
      console.log("all good")
      this.setState({ result: "all good" })
    }
    event.preventDefault();
  }

  //todo, fix remove button spacing, allow changing "Example Recipe" into custom title
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
                <NavDropdown title="Options" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Save As</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Load</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                </NavDropdown>
              </form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div class="row">
          <div class="col-12">
            <h1 class="header">Example Recipe</h1>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.createInputEntry()}
          <div class="row">
            <div class="col-12">
              <Button value='addinput' onClick={this.addClick.bind(this, "input")}>Add Input</Button>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Crafting Time</span>
                </div>

                <input autocomplete="off" type="number" name="crafting_time" value={this.state.crafting_time || ''} onChange={this.handleChange.bind(this, 0, "crafting_time")} required></input>
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
      </Container>
    );
  }
}