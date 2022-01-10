import logo from './logo.svg';
/*
import './App.scss';
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: ""
    }
  }

  onClick = getInput => {
    this.getForm()
  }

  getForm = () => {
    this.setState({
      result: ""
    })
    //for each input, get rate * needed vs output crafting time
    var input1_use_rate = document.getElementById("input-time").value * document.getElementById("input-needed").value
    var input2_use_rate = document.getElementById("input2-time").value * document.getElementById("input2-needed").value
    var output_crafting = document.getElementById("output-crafting-time").value

    if (input1_use_rate < output_crafting && input2_use_rate < output_crafting) {
      console.log("output: crafting too slow");
      this.setState({
        result: "output: crafting too slow"
      })
    }
    if (input1_use_rate > output_crafting) {
      console.log("input 1: not enough flow");
      this.setState({
        result: this.state.result + "Input1 is slow,"
      })
    }
    if (input2_use_rate > output_crafting) {
      console.log("input 2: not enough flow");
      this.setState({
        result: this.state.result + "Input2 is slow,"
      })
    }
    if(this.state.result === "") {
      this.setState({
        result: "all good"
      })
    }
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
        <div class="row">

          <div class="col-12">
            <span class="header h4">Input #1</span>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon" >Name</span>
              </div>
              <input type="text" class="form-control" id="input-name" aria-describedby="basic-addon3" defaultValue="Iron Plate" required></input>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon">Flow</span>
              </div>
              <input type="number" class="form-control" id="input-time" aria-describedby="basic-addon3" defaultValue="1" required></input>
              <span class="input-group-text" id="basic-addon">per</span>
              <select class="form-select" id="input-time-units" defaultValue="2">
                <option value="1">Miliseconds</option>
                <option value="2">Seconds</option>
                <option value="3">Minutes</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon"># Needed</span>
              <input type="number" class="form-control" id="input-needed" aria-describedby="basic-addon3" defaultValue="1" required></input>
            </div>
          </div>

          <div class="col-12">
            <span class="header h4">Input #2</span>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon">Name</span>
              </div>
              <input type="text" class="form-control" id="input2-name" aria-describedby="basic-addon3" defaultValue="Cooper Wire" required></input>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon">Flow</span>
              </div>
              <input type="number" class="form-control" id="input2-time" aria-describedby="basic-addon3" defaultValue="1" required></input>
              <span class="input-group-text" id="basic-addon">per</span>
              <select class="form-select" id="input2-time-units" defaultValue="2">
                <option value="1">Miliseconds</option>
                <option value="2" >Seconds</option>
                <option value="3">Minutes</option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon"># Needed</span>
              <input type="number" class="form-control" id="input2-needed" aria-describedby="basic-addon3" defaultValue="3" required></input>
            </div>
          </div>

          <div class="col-12">
            <Button>Add Input</Button>
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

        <Button onClick={this.onClick}>Calculate</Button>
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