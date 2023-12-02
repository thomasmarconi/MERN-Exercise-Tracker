import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


export default class AltNavbar extends Component{
    render() {
        return (
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#home">LiftSomeHeavyAssWeight</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Exercises</Nav.Link>
                <Nav.Link href="/create">Create Exercise Log</Nav.Link>
                <Nav.Link href="/user">Create User</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          );
    }
};