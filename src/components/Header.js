import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";

const Header = () => {

    return (
        <Navbar bg = "dark" variant = "dark" expand = "lg">
            <Container fluid>
                <Navbar.Brand href ="/" style = {{"color": 'gold'}}>
                    PDFlex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style = {{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to ="/">Home</NavLink>
                        <NavLink className="nav-link" to ="/members">Members</NavLink>
                    </Nav>
                    <a href="/components/Upload2">
                    <Button variant="outline-info" className="me-2">Upload Files Alternative</Button>
                    </a>
                    <a href="/components/Upload">
                        <Button variant="outline-info" className="me-2">Upload Files</Button>
                    </a>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
