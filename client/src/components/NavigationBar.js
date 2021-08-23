import { React } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAppContext } from "../utils/AppContext"

function NavigationBar() {
    const appCtx = useAppContext()

    return (

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                {/* <Navbar.Brand href="#home">David OBrien's Adventure Store</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Clothing" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/category/Boots">Boots</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Jackets">Jackets</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Pants">Pants</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/category/Underwear">Inner Layers</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Camping" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/category/Sleeping Bags">Sleeping Bags</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Tents">Tents</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Camping">Cookstoves</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/category/Navigation">GPS/Compass</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Climbing" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/category/Ropes">Ropes</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Boots">Shoes/Boots</NavDropdown.Item>
                            <NavDropdown.Item href="/category/Climbing">Ice Climbing</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/category/Climbing">Protection</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                    {appCtx && appCtx.appState.user.role === "Admin" && (
                        <LinkContainer to="/admin">
                            <Nav.Link>Product Admin</Nav.Link>
                        </LinkContainer>
                    )}
                        <LinkContainer to="/login">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
                {appCtx && appCtx.appState.user.first_name  && (
                    <h3>Welcome {appCtx.appState.user.first_name}!</h3>
                )}
            </Container>
        </Navbar>
    );
}
export default NavigationBar;


