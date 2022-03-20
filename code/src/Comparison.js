import './bootstrap_defaults/bootstrap-theme.css'
import './bootstrap_defaults/bootstrap-theme.min.css'

import 'bootstrap/js/src/modal.js'
import './Custom.css'
import"./fire.js"

//React
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

//firebase database
import { getDatabase, ref, update, push, get, child } from "firebase/database";

//firebase auth
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";


//Global variables
const auth = getAuth()

var timeConversion = {
  Milisecond: 1,
  Second: 1000,
  Minute: 6000
}

export default class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) || {
      title: "Example Title",
      basic_info: '',
      calculated_results: '',
      inputs: ['', ''],
      outputs: [''],
      crafting_time: null,
      crafting_time_units: null,
      login: null,
      edit_mode: false,
      save_key: null,
      loaded_recipes: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log(user)
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
          <button class="btn btn-primary text-right" value='remove' onClick={this.removeClick.bind(this, i, "input")}>Remove</button>
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
              <option value="Milisecond">Milisecond</option>
              <option value="Second" >Second</option>
              <option value="Minute">Minute</option>
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
    return this.state.outputs.map(({ output_name, output_quantity }, i) =>
      <div class="row" key={i}>
        <div class="col-12">
          <span class="header h4">Output #{i}</span>
          <button class="btn btn-primary text-right" value='remove' onClick={this.removeClick.bind(this, i, "output")}>Remove</button>
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
            <input autoComplete="off" type="number" name="output_quantity" value={output_quantity || ''} onChange={this.handleChange.bind(this, i, "output")} required></input>
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

  calculateRateDifference(input) {
    /*
    console.log("Input flow: " + input.flow)
    console.log("Input flow units: " + timeConversion[input.flow_units])
    console.log("Input needed: " + input.needed)
    console.log("Crafting time: " + this.state.crafting_time)
    console.log("Crafting time units: " + timeConversion[this.state.crafting_time_units])
    */
    let calc = (input.flow / 1 * timeConversion[input.flow_units]) - (input.needed / this.state.crafting_time * timeConversion[this.state.crafting_time_units])
    return calc;
  }

  //todo: optimize: store calc_results as {result, id} and sort by results, do comparisons with sorted list to save computing time
  //todo: add proper check for field inputs, factor time units (eval())
  handleSubmit(event) {
    let [input_array] = [this.state.inputs];
    let output_string = [];
    let calc_results = [];
    if (this.state.inputs !== null && this.state.outputs !== null) {
      this.state.inputs.forEach(element => output_string.push("Input: " + element.name + "\nNeeded: " + element.needed + " item(s)\nFlow Rate: " + element.flow + " item(s)/" + element.flow_units))
      output_string.push("")
      this.state.outputs.forEach(element => output_string.push("Output: " + element.output_name + "\nProduces: " + element.output_quantity + " item(s)"))
      output_string.push("Time to craft: " + this.state.crafting_time + " " + this.state.crafting_time_units + "\n")
      input_array.forEach(element => calc_results.push(this.calculateRateDifference(element)))

      let iter = 0;
      calc_results.forEach(element => {
        if (element !== 0) {
          if (element < 0) {
            if (Math.abs(element) >= 6000) {
              output_string.push(this.state.inputs[iter].name + ": " + element / 6000 + "/Minute deficit");
            }
            else if (Math.abs(element) >= 1000) {
              output_string.push(this.state.inputs[iter].name + ": " + element / 1000 + "/Second deficit");
            }
            else {
              output_string.push(this.state.inputs[iter].name + ": " + element + "/Milisecond deficit");
            }
          }
          else {
            if (element >= 6000) {
              output_string.push(this.state.inputs[iter].name + ": " + element / 6000 + "/Minute surplus");
            }
            else if (element >= 1000) {
              output_string.push(this.state.inputs[iter].name + ": " + element / 1000 + "/Second surplus");
            }
            else {
              output_string.push(this.state.inputs[iter].name + ": " + element + "/Milisecond surplus");
            }
          }
        }
        else {
          output_string.push(this.state.inputs[iter].name + ": Just enough")
        }
        iter++;
      })

      if (calc_results.every(element => element === 0)) {
        output_string.push("Perfect flow")
      }
      else {
        output_string.push("")
        if (calc_results.every(element => element >= 0)) {
          output_string.push("Excessive input materials")
        }
        else {
          output_string.push("Not enough input materials")
        }
      }


      var combined = output_string.join('\n');
      this.setState({ basic_info: combined });
    }
    event.preventDefault();
  }

  //todo: add login check for upload
  //todo: add proper check for field inputs
  uploadToFirebase() {
    const user = auth.currentUser;
    const db = getDatabase();
    if (this.state.save_key === null) {
      push(ref(db, 'users/' + user.uid), {
        title: this.state.title,
        inputs: this.state.inputs,
        outputs: this.state.outputs,
        crafting_time: this.state.crafting_time,
        crafting_time_units: this.state.crafting_time_units
      }).then((snap) => {
        this.setState({ save_key: snap.key })
        alert("New recipe created")
      })
        .catch(() => {
          alert("Error")
        })
    }
    else {
      update(ref(db, 'users/' + user.uid + '/' + this.state.save_key), {
        title: this.state.title,
        inputs: this.state.inputs,
        outputs: this.state.outputs,
        crafting_time: this.state.crafting_time,
        crafting_time_units: this.state.crafting_time_units
      }).then(() => {
        alert("Recipe updated")
      })
        .catch(() => {
          alert("Error")
        })
    }
  }

  showSavedRecipies() {
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());
    var get_recipes = [];
    get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          get_recipes.push({ recipe_key: childSnapshot.key, title: childSnapshot.child('title').val() })
        })
        this.setState({ loaded_recipes: get_recipes });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  createRecipesEntry() {
    if (this.state.loaded_recipes) {
      return this.state.loaded_recipes.map(({ recipe_key, title }, i) =>
        <div class="modal-body row" key={i}>
          <div class="col-md-8">
            <button type="button" class="btn btn-link" onClick={this.loadSavedRecipe.bind(this, recipe_key)} data-bs-dismiss="modal">{recipe_key}</button>
          </div>
          <div class="col-md-4">
            {title}
          </div>
        </div>
      )
    }
  }

  //todo: replace alert with toast
  loadSavedRecipe(key_value) {
    const user = auth.currentUser;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${user.uid}/${key_value}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.setState({
          title: snapshot.child('title').val(),
          basic_info: null,
          inputs: snapshot.child('inputs').val(),
          outputs: snapshot.child('outputs').val(),
          crafting_time: snapshot.child('crafting_time').val(),
          crafting_time_units: snapshot.child('crafting_time_units').val(),
          edit_mode: false,
          save_key: key_value
        })
        alert("Load successful")
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  //todo: add exit confirmation (need to save?)
  logout_function() {
    auth.signOut().then(() => {
      this.clear_local_storage()
      window.location.reload()
    })
  }

  render_login() {
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
            <button class="btn btn-primary" value='save' onClick={this.end_title_edit.bind(this)}>Save</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div class="col-12">
          <div>
            <h1 class="header">{this.state.title}</h1>
            <button class="btn btn-primary" value='edit' onClick={this.start_title_edit.bind(this)}>Edit</button>
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
    alert(JSON.parse(localStorage.getItem("state")))
    console.log(JSON.parse(localStorage.getItem("state")))
  }

  clear_local_storage() {
    window.localStorage.clear();
  }

  //todo, fix remove button spacing
  render() {
    return (
      ///Navbar
      <Container>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Load Recipe from Database</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {this.createRecipesEntry()}
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Factory I/O Calculator</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              </Nav>
              <form class="form-inline my-2 my-lg-0">
                <NavDropdown title={this.state.login} id="basic-nav-dropdown">
                  <NavDropdown.Item >New Recipe</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.uploadToFirebase.bind(this)}>Save</NavDropdown.Item>
                  <NavDropdown.Item data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={this.showSavedRecipies.bind(this)}>Load</NavDropdown.Item>
                  <NavDropdown.Item href="/test">Test Page</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {this.render_login()}
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
              <button class="btn btn-primary" value='addinput' onClick={this.addClick.bind(this, "input")}>Add Input</button>
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
                  <option value="Milisecond">Milisecond</option>
                  <option value="Second">Second</option>
                  <option value="Minute">Minute</option>
                </select>
              </div>
            </div>
          </div>
          {this.createOutputEntry()}
          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary" value='addoutput' onClick={this.addClick.bind(this, "output")}>Add Output</button>
            </div>
          </div>
          <button class="btn btn-primary" type="submit" value="Submit">Calculate</button>
        </form>
        <hr></hr>
        <div class="row">
          <div class="col-12">
            <span class="h4">Results</span>
          </div>
          <div class="col-12">
            <pre>{this.state.basic_info}</pre>
            <pre>{this.state.calculated_results}</pre>
          </div>
        </div>
        <button type="button" class='btn btn-info' onClick={this.check_local_storage.bind(this)}>Check local storage</button>
        <button type="button" class='btn btn-danger' onClick={this.clear_local_storage.bind(this)}>Clear local storage</button>
      </Container>
    );
  }
}