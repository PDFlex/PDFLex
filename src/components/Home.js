import React from 'react'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Home = ({information}) => {
    const returnInfo = async () => {
        let personChosen = document.getElementById("personChosen").value;

        const url = "https://pdflex-backend.duckdns.org/information/" + personChosen;

        try {
            const res = await fetch(url, {method: "GET"});
            const data = await res.json();
            console.log(data);
            /*eslint no-undef: "off"*/
            const parsedData = JSON.parse(JSON.stringify(data))
            toBeUpdated.innerHTML = "Name: " + parsedData.firstName + ", Main Connection: " + parsedData.githubRepo;
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div>
            <Container>
                <hr></hr>
                <img ></img>
                <input id="personChosen" type="text" placeholder='Insert Name Here:'></input>
                <Button onClick={returnInfo} > Learn More About Me </Button>

                <br></br>
                <hr></hr>
                <p id="toBeUpdated"> </p>
            </Container>
        </div>
    )

}
export default Home
