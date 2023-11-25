import Button  from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import axios from "axios";

function CreateNewClaim() {
    let clientId = 3;
    const basemessage = {
        "noteBody": "Hiya Ben!",
        "firstName": "Ben",
        "clientId": "1234"
    }

    // Additional Post for CNC:
    const url2 = 'http://localhost:8080/information/claims';
    axios.post(url2, basemessage).then(() => {} );
}

const Header = () => {

    return (
        <Navbar bg = "light" variant = "light" expand = "lg">
            <Container fluid>
                <Navbar.Brand href ="/" style = {{"color": '#32a852'}}>
                    PDFlex
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style = {{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to ="/ClaimsView">View My Claims</NavLink>
                        <NavLink className="nav-link" to ="/components/Upload" onClick={CreateNewClaim}>Create New Claim</NavLink>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
