import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function NavbarComp() {
  return (
    <Navbar bg="light" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          The-Project-3
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/product">Product</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>

              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Detail Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Change Password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
