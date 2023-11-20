import styled from 'styled-components';
import securianLogo from './securian-logo.png';
import backgroundImage from './login-background.jpg';

const Container = styled.div`
    background-image: url(${backgroundImage});
    background-size: cover;
    display: flex;
    align-items: center; // by default, the cross-axis is vertical
    justify-content: center;
    height: 100vh;
`

const LoginContainer = styled.div`
    position: static;
    width: 35%;
    margin: auto;

    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow: 0 0 20px 5px black; // horizontal, vertical, blur radius, spread radius, color
    border-radius: 2%;
    background-color: #fbfaf2;
`

const Logo = styled.img`
    display: block;
    width: 80%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;  
    align-items: center;
    width: 100%;
`

const Button = styled.button`
    border: 2px solid black;
`

const Login = () => {
    return (
        <Container>
            <LoginContainer>
                <Logo src={securianLogo} alt="Logo"/>
                <ButtonContainer>
                    <Button>Login</Button>
                </ButtonContainer>
            </LoginContainer>
        </Container>
    );
}
 
export default Login;