import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => (
    <Navbar sticky="top" bg="white" className="border-bottom border-2 border-secondary py-3 mb-4">
        <Navbar.Brand className="me-4">Navigation</Navbar.Brand>

        <Nav className="d-flex justify-content-center">
            <Nav.Link as={Link} to="/">Converter</Nav.Link>
            <Nav.Link as={Link} to="/rates">Rates</Nav.Link>
        </Nav>
    </Navbar>
);

export default Header;
