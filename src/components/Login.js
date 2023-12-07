import { useState, useContext } from "react";
import styled from 'styled-components';
import securianLogo from '../images/securian-logo.png';
import backgroundImage from '../images/login-background.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {UserIdContext} from "../App";


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
`

const LoginContainer = styled.div`
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

const Login = () => {
    const {clientId, setClientId} = useContext(UserIdContext)
    const [verificationMsg, setVerificationMsg] = useState('');
    const navigate = useNavigate();

    const verifyClientId = (clientId) => {
        if (clientId.clientId !== '') {
            const url = 'http://159.203.24.109:8080/login/' + clientId.clientId;
            axios.get(url).then((res) => {
                if (res.data === false) {
                    setVerificationMsg('User not found.')
                } else {
                    navigate('/ViewClaimsDashboard');
                }
            });
        } else {
            setVerificationMsg('Please enter client ID.')
        }
    }

    return (
        <Container>
            <LoginContainer>
                <Logo src={securianLogo} alt="Logo"/>
                <Text>Welcome</Text>
                <Label>Enter Client ID</Label>
                <Input type='number' placeholder='Client ID' value={clientId} onChange={(e) => setClientId(e.target.value)}/>
                <Message>{verificationMsg}</Message>
                <Button onClick={() => verifyClientId({clientId})}>Login</Button>
            </LoginContainer>
        </Container>
    );
}
 
export default Login;