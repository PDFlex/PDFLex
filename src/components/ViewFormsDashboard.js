import {useEffect, useState} from "react";
import styled from 'styled-components';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import React, { useContext } from 'react';
import {UserIdContext} from "../App";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
`

const ClaimsContainer = styled.div`
    width: 80%;
    height: 80%;
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    height: 10%;
    margin: 0.5em 0;
`

const Heading = styled.h1`
    display: inline-block;
    font-size: 3em;
    color: #0C9644;
    margin-right: auto;
`

const Button = styled.button`
    height: 75%;
    margin-left: auto;
    display: inline-block;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 0.5em;
    background-color: #11a346;
    border: none;
    padding: 0 1em;
    font-size: 1.2em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const ViewFormsDashboard = () => {
    const navigate = useNavigate();
    const {clientId} = useContext(UserIdContext)
    const {claimId} = useContext(UserIdContext);

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:8080/' + clientId.toString() + '/' + claimId.toString() +'/forms';

        axios.get(url).then((res) => {
            // const data = res.json();
            const parsedData = JSON.parse(JSON.stringify(res.data))
            console.log(parsedData)
            let forms = [];
            const formType = "Life Claim Information Request";

            for (let i = 0; i < parsedData.length; i++) {
                const newElement = {
                    id: parsedData[i].formId,
                    formType: formType,
                    status: parsedData[i].status,
                    date: new Date()
                };
                forms.push(newElement);
            }
            setTableData([...tableData, ...forms]);


        });
    }, [clientId, claimId]);



    function renderTable(tableData) {
        return tableData.map(item => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.formType}</td>
                <td>{item.status}</td>
                <td>{item.date.toString()}</td>
                <td><Link to={`/ViewForm`}><Button>>View</Button></Link></td>

                {/*TODO: Add a form view page*/}
            </tr>
        ))

    }
    function BackToClaimsDashboard() {
        navigate('/ViewClaimsDashboard');
    }


    return (
        <Container>
            <HeaderContainer>
                <Heading>Form Dashboard</Heading>
                <Button onClick={BackToClaimsDashboard}>Back to Claims</Button>

            </HeaderContainer>

            <ClaimsContainer>
                <Table className="table" cellPadding="10">
                    <thead>
                    <tr>
                        <th scope="col" id="Id">Id</th>
                        <th scope="col" id="formtype">Type</th>
                        <th scope="col" id="formstatus">Status</th>
                        <th scope="col" id="date">Date Filed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Mapping through tableData to render rows */}
                    {renderTable(tableData)}
                    </tbody>

                </Table>

            </ClaimsContainer>
        </Container>
    );
}

export default ViewFormsDashboard;