import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import "./pubNav.scss"
const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/signup">
      <NavItem  eventKey={1} href="/signup" id="signUp">Sign Up</NavItem>
    </LinkContainer>
    <LinkContainer to="/login">
      <NavItem eventKey={2} href="/login" id="login">Log In</NavItem>
    </LinkContainer>
  </Nav>
);

export default PublicNavigation;
