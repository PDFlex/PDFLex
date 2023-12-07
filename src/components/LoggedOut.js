// This page is the logout screen. Once users are logged out, they can click to go back to the login page.

import styled from 'styled-components';
import securianLogo from '../images/securian-logo.png';
import backgroundImage from '../images/login-background.jpg';
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
`

const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 60%;
    margin: auto;
    box-shadow: 0 0 2rem 0.5rem black;
    border-radius: 1rem;
    background-color: #fbfaf2;
    flex-direction: column;
`

const Logo = styled.img`
    flex: 1;
    padding: 2.3rem 0 1rem;
    width: 70%;`

const Text = styled.h3`
    flex: 1;
    margin: 5rem;
    font-size: 2.2rem;
`

const Button = styled.button`
    flex: 1;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 1.5em;
    background-color: #11a346;
    border: none;
    margin: 2rem;
    padding: 2% 4%;
    font-size: 1.4em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const LoggedOut = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <LoginContainer>
                <Logo src={securianLogo} alt="Logo"/>
                <Text>You are logged out</Text>
                <Button onClick={() => navigate('/')}>Back to login</Button>
            </LoginContainer>
        </Container>
    );
}
 
export default LoggedOut;