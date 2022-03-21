/*
To test: Input form validation
Login validation
Rate Calculations

figure out text/button alignment
test mobile columns and input fields
copy storage buttons from camparison to here

first section - layout focus
second section - input/calculation focus
*/

//React
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import Flow from './ExampleFlow'

export default class CodeTest extends Component {
    render() {
        return (
            <Container>
                <Flow style/>
            </Container>
        )
    }
}