import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;    
`

const Heading = styled.h1`
    font-size: 4em;
    color: #0C9644;
`

const Text = styled.p`
    font-size: 1.3em;
    margin: 0 0 6rem;
`

const Button = styled.button` 
    margin: 1rem;
    padding: 1rem 2rem;
    background-color: #11a346;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 0.3em;
    border: none;
    font-size: 1.5em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const ClaimSubmittedView = () => {
    const navigate = useNavigate();
    
    return (
        <Container>
            <Heading>Claim Submitted</Heading>
            <Text>You are all done! You can safely close this tab.</Text>
            <Button onClick={() => navigate('/ViewClaimsDashboard')}>View Dashboard</Button>
        </Container>
    );
}
 
export default ClaimSubmittedView;