import logo from './logo.svg';
/*
import './App.scss';
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

import React from 'react';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Button from 'react-bootstrap/Button'



function App() {
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
                <NavDropdown.Item href="#action/3.2">Save</NavDropdown.Item>
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
              <span class="input-group-text" id="basic-addon">Name</span>
            </div>
            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Flow</span>
            </div>
            <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
            <span class="input-group-text" id="basic-addon">per</span>
            <select class="custom-select" id="inputGroupSelect01">
              <option value="1">Miliseconds</option>
              <option value="2">Seconds</option>
              <option value="3">Minutes</option>
            </select>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon"># Needed</span>
            <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
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
            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
          </div>
        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon">Crafting Time</span>
            </div>
            <input type="number" class="form-control" id="basic-url" aria-describedby="basic-addon3"></input>
            <select class="custom-select" id="inputGroupSelect01">
              <option value="1">Miliseconds</option>
              <option value="2">Seconds</option>
              <option value="3">Minutes</option>
            </select>
          </div>
        </div>
      </div>

      <Button>Calculate</Button>
      <hr></hr>
      <div class="row">
        <div class="col-12">
          <span class="h4">Result</span>
        </div>
        <div class="col-12">
          <span>Result here</span>
        </div>
      </div>
    </Container>
  );
}

export default App;
