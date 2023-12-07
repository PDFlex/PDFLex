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

const ViewClaimsDashboard = () => {
    const navigate = useNavigate();
    const {clientId} = useContext(UserIdContext)
    const {setClaimId} = useContext(UserIdContext);
    const url = 'http://localhost:3000/'+ clientId.toString() + '/claims';

    const [tableData, setTableData] = useState([]);
    console.log(clientId);

    useEffect(() => {
        axios.get(url).then((res) => {
            const parsedData = JSON.parse(JSON.stringify(res.data))
            let claimType = "Life Claim";
            const newClaims = [];
            console.log(parsedData)

            for (let i = 0; i < parsedData.length; i++) {
                const newElement = {
                    id: parsedData[i].claimId, // Example: incrementing ID
                    claimType: claimType, // Example: generating a name
                    status: parsedData[i].status,
                    date: parsedData[i].createdClaimDate
                };
                newClaims.push(newElement);
            }
            setTableData([...tableData, ...newClaims]);


        });
        // eslint-disable-next-line
    }, [clientId, url]);


    function CreateNewClaim() {
        const baseMessage = {
            "clientId": clientId.toString()
        }
        navigate('/SelectFillOrUpload');

        const url2 = 'http://localhost:8080/new-claim';
         axios.post(url2, baseMessage).then((res) => {
            setClaimId(JSON.parse(JSON.stringify(res.data)))
        } );
    }
    function renderTable(tableData) {
        return tableData.map(item => (
            <tr key={item.id}>
                {/*TODO: Switch this to a be a URL parameter!*/}
                {/* on click is the quick and dirty version*/}
                <td>{item.id}</td>
                <td>{item.claimType}</td>
                <td>{item.status}</td>
                <td>{item.date}</td>
                {/*TODO: Switch this to a be a URL parameter!*/}
                {/* on click is the quick and dirty version*/}
                <td><Link to={`/ViewFormsDashboard`}><Button onClick={() => {setClaimId(item.id)}}>View</Button></Link></td>
            </tr>
        ))
    }

    return (
        <Container>
            <HeaderContainer>
                <Heading>Claims Dashboard</Heading>
                <Button onClick={CreateNewClaim}>Create New Claim</Button>
            </HeaderContainer>

            <ClaimsContainer>
                <Table className="table" cellPadding="10">
                    <thead>
                    <tr>
                        <th scope="col" id="Id">Id</th>
                        <th scope="col" id="claimtype">Type</th>
                        <th scope="col" id="claimstatus">Status</th>
                        <th scope="col" id="date">Date Filed</th>
                        <th scope="col" id="viewbutton"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {renderTable(tableData)}
                    </tbody>

                </Table>
            </ClaimsContainer>
        </Container>

    );
}

export default ViewClaimsDashboard;