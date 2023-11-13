import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import React from "react";
import personChosen from "./Home"

const ViewClaims = () => {
    const returnInfo = async () => {
        // let personChosen = document.getElementById("personChosen").value;
        console.log(personChosen)
        const url = "http://localhost:8080/information/Ben" ;
        // + personChosen;
        try {
            const res = await fetch(url, {method: "GET"});
            const data = await res.json();
            console.log(data);

            if (JSON.stringify(data) == null){
                /*eslint no-undef: "off"*/
                toBeAllClaims.innerHTML = "No Claims";
            }
            else{
                /*eslint no-undef: "off"*/
                toBeAllClaims.innerHTML = JSON.stringify(data);
            }

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Container>
                <p id="toBeAllClaims"> </p>
                <Button onClick={ViewClaims}> View All Claims </Button>
                <br></br>
            </Container>
        </div>
    )
}

export default ViewClaims;