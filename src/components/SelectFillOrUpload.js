// This page allows users to select whether they want to upload a PDF or manually fill out a form.

import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Button = styled.button` 
    width: 25rem;
    height: 15rem;
    margin: 2rem;
    background-color: #11a346;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 0.5em;
    border: none;
    font-size: 2em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const Text = styled.h1`
    font-size: 4em;
    margin: 4rem;
    color: #d6d6d6;
`

const SelectFillOrUpload = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={() => navigate('/Upload')}> Upload PDF File </Button>
            <Text>OR</Text>
            <Button onClick={() => {navigate('/Form')}}> Fill Out Online Form </Button>
        </Container>
    );
}
 
export default SelectFillOrUpload;