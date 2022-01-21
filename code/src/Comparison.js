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
      input_count: 1,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createUI() {
    return this.state.inputs.map(({ name, flow, flow_units, needed }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Input #2</span>
          <Button class="text-right" value='remove' onClick={this.removeClick.bind(this, i)}>Remove</Button>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input type="text" name="name" value={name || ''} onChange={this.handleChange.bind(this, i)} required></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Flow</span>
            </div>
            <input type="number" name="flow" value={flow || ''} onChange={this.handleChange.bind(this, i)} required></input>
            <span class="input-group-text" id="basic-addon">per</span>
            <select class="form-select" name="flow_units" value={flow_units || ''} onChange={this.handleChange.bind(this, i)}>
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
            <input type="number" name="needed" value={needed || ''} onChange={this.handleChange.bind(this, i)} required></input>
          </div>
        </div>
      </div>

    )
  }

  handleChange(i, event) {
    const { name, value } = event.target;
    const inputs = [...this.state.inputs];
    inputs[i] = { ...inputs[i], [name]: value };
    this.setState({ inputs });
  }

  addClick() {
    this.setState(prevState => ({ inputs: [...prevState.inputs, ''] }))
  }

  removeClick(i) {
    let inputs = [...this.state.inputs];
    inputs.splice(i, 1);
    this.setState({ inputs });
  }

  handleSubmit(event) {
    this.state.inputs.forEach(element => alert(element.name + ' ' + element.flow + ' ' + element.flow_units + ' ' + element.needed));
    var input_array = this.state.inputs;
    event.preventDefault();
  }

  onClick = getInput => {
    this.getForm()
  }

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
        {this.createUI()}
          <div class="row">
            
            <div class="col-12">
              <Button value='add more' onClick={this.addClick.bind(this)}>Add Input</Button>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <span class="header h4">Output #1</span>
            </div>
            <div class="col-4">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon">Name</span>
                </div>
                <input type="text" class="form-control" id="output-name" aria-describedby="basic-addon3" defaultValue="Eletronic Circuit" required></input>
              </div>
            </div>
            <div class="col-4">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon">Crafting Time</span>
                </div>
                <input type="number" class="form-control" id="output-crafting-time" aria-describedby="basic-addon3" defaultValue="1" required></input>
                <select class="form-select" id="output-crafting-time-units" defaultValue="2">
                  <option value="1">Miliseconds</option>
                  <option value="2">Seconds</option>
                  <option value="3">Minutes</option>
                </select>
              </div>
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