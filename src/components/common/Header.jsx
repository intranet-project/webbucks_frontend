import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
/**
 * Hedaer 컴포넌트로 네비게이션 메뉴를 포함한 헤더 기능
 * @author 최유빈
 * @version 1.0
 * 2024-06-28
 */
const Header = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Starbucks</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/products">Products</Nav.Link>
        <Nav.Link href="/stores">Stores</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
