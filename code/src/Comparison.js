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
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createInputEntry() {
    return this.state.inputs.map(({ name, flow, flow_units, needed }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Input #2</span>
          <Button class="text-right" value='remove' onClick={this.removeClick.bind(this, i, "input")}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input type="text" name="name" value={name || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Flow</span>
            </div>
            <input type="number" name="flow" value={flow || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
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
            <input type="number" name="needed" value={needed || ''} onChange={this.handleChange.bind(this, i, "input")} required></input>
          </div>
        </div>
      </div>
    )
  }

  createOutputEntry() {
    return this.state.outputs.map(({ output_name, time, time_units }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Output #1</span>
          <Button class="text-right" value='remove' onClick={this.removeClick.bind(this, i, "output")}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input type="text" name="output_name" value={output_name || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Crafting Time</span>
            </div>
            <input type="number" name="time" value={time || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
            <select class="form-select" name="time_units" value={time_units || ''} onChange={this.handleChange.bind(this, i, "output")}>
              <option>Choose...</option>
              <option value="1">Miliseconds</option>
              <option value="2">Seconds</option>
              <option value="3">Minutes</option>
            </select>
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

  handleSubmit(event) {
    this.state.inputs.forEach(element => alert("Input: " + element.name + ' ' + element.flow + ' ' + element.flow_units + ' ' + element.needed));
    this.state.outputs.forEach(element => alert("Output: " + element.output_name + ' ' + element.time + ' ' + element.time_units));
    var [input_array, output_array] = [this.state.inputs, this.state.outputs];
    if (input_array.every(element => element.flow > output_array[0].time)) {
      console.log("output crafting too slow")
      this.setState({ result: "output crafting too slow" });
    }
    else if (input_array.some(element => element.flow < output_array[0].time)) {
      console.log("an input has too few flow")
      this.setState({ result: "an input has too few flow" })
    }
    else {
      console.log("all good")
      this.setState({ result: "all good" })
    }
    event.preventDefault();
  }
  //todo: add crafting quantity
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