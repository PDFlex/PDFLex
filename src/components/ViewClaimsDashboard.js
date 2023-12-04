import {useEffect, useState} from "react";
import styled from 'styled-components';
import securianLogo from '../images/securian-logo.png';
import backgroundImage from '../images/login-background.jpg';
import axios from "axios";
import * as PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; Allows us to redirect to other pages in the future
import React, { useContext } from 'react';
// import {UserIdProvider, UserProfile } from './Login'
import {UserIdContext} from "../App";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
`

const CreateNewClaimContainer = styled.div`
    position: relative;
    width: 40%;
    height: 60%;
    margin: auto;
    box-shadow: 0 0 2rem 0.5rem black;
    border-radius: 1rem;
    background-color: #fbfaf2;
`
const ClaimsContainer = styled.div`
    position: relative;
    width: 40%;
    height: 60%;
    margin: auto;
    box-shadow: 0 0 2rem 0.5rem black;
    border-radius: 1rem;
    background-color: #fbfaf2;
`
const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 15%;
    display: block;
    width: 70%;
`

const Text = styled.h3`
    position: absolute;
    top: 30%;
    left: 10%;
    display: block;
    font-size: 2.2rem;
`

const Label = styled.label`
    position: absolute;
    top: 47%;
    left: 10%;
    font-size: 1.1em;
    font-weight: 425;
`

const Input = styled.input`
    position: absolute;
    top: 52%;
    left: 10%;
    display: block;
    width: 80%;
    padding: 0.8rem 1rem;
    margin: 0.5rem 0;
    border: 0.05rem solid #ccc;
    border-radius: 0.5rem;
    box-sizing: border-box;
    &:focus {
        outline: 0.1rem solid #11a346;
    }
    &::-webkit-inner-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    } 
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`

const Message = styled.p`
    position: absolute;
    bottom: 24%;
    left: 10%;
    font-size: 0.9em;
    color: #dc143c;
`

const Button = styled.button`
    position: absolute;
    bottom: 10%;
    right: 10%;
    display: block;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 1.5em;
    background-color: #11a346;
    border: none;
    padding: 1% 4%;
    font-size: 1.4em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const ViewClaimsDashboard = () => {
    const navigate = useNavigate();
    const url = 'http://localhost:8080/1234/claims';
    const {clientId, setClientId} = useContext(UserIdContext)
    const [Claims, setClaims] = useState('');
    const [tableData, setTableData] = useState([]);
    console.log(clientId);

    useEffect(() => {
        axios.get(url).then((res) => {
            const parsedData = JSON.parse(JSON.stringify(res.data))
            let claimType = "Life Claim";
            const newClaims = [];

            for (let i = 0; i < parsedData.length; i++) {
                const newElement = {
                    id: parsedData[i].claimId, // Example: incrementing ID
                    claimType: claimType, // Example: generating a name
                    // status: parsedData[i].status,
                    date: new Date()
                };
                newClaims.push(newElement);
                // setTableData([...tableData, newElement]);
                // document.select("tbody").insert("tr").html("<td>" + (parsedData[i].claimId) + "</td>" + "<td>" + (claimType) +  "</td>" + "<td>" + (parsedData[i].status) +  "</td>" +"<td>" + (new Date()) +  "</td>");
            }
            setTableData([...tableData, ...newClaims]);


        });
    }, [clientId]);


    function CreateNewClaim() {
        const basemessage = {
            "clientId": 1234
        }
        navigate('/SelectFillOrUpload');


        const url2 = 'http://localhost:8080/new-claim';
        axios.post(url2, basemessage).then(() => {} );
    }

    function renderTable(tableData) {
        return tableData.map(item => (
            <tr key={item.id}>
                {/*Insert React Link inside the td surrounding item.id*/}
                {/*<td><Link to={something}>{item.id}</Link></td>*/}
                <td>{item.id}</td>
                <td>{item.claimType}</td>
                {/*<td>{item.status}</td>*/}
                <td>{item.date.toString()}</td>


                {/* Render other cells based on item properties */}
            </tr>
        ))

    }

    return (
        <Container>
            <ClaimsContainer>
                <Logo src={securianLogo} alt="Logo"/>
                <Text>Welcome User:</Text>
                {/*<Label>Current Claims are: </Label>*/}
                <Label id={"claimsList"}></Label>
                <Table className="table" cellPadding="10">
                    <thead>
                    <tr>
                        <th scope="col" id="Id">Id</th>
                        <th scope="col" id="claimtype">Type</th>
                        <th scope="col" id="claimstatus">Status</th>
                        <th scope="col" id="date">Date Filed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Mapping through tableData to render rows */}
                    {renderTable(tableData)}
                    </tbody>

                </Table>
                <Message>{Claims}</Message>

            </ClaimsContainer>
            <CreateNewClaimContainer>
                <Button onClick={CreateNewClaim}>Create New Claim</Button>
            </CreateNewClaimContainer>

        </Container>

    );
}

export default ViewClaimsDashboard;

// axios.get(url).then((res) => {
//     // const data = res.json();
//     const parsedData = JSON.parse(JSON.stringify(res.data))
//     /*eslint no-undef: "off"*/
//     console.log(parsedData)
//     let claimsIds = "";
//     for (let i = 0; i<parsedData.length; i++){
//         claimsIds += "Claim Id:" + parsedData[i].claimId;
//     }
//     setClaims(claimsIds);
//
// });
