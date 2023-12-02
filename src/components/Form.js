import { useState } from "react";
import axios from "axios";
import styled from 'styled-components';
import securianLogo from '../images/securian-logo.png';
import backgroundImage from '../images/login-background.jpg';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
`

const FormContainer = styled.div`
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

// PLEASE NOTE: This code is attributed to Sarah Wang.
const Form = () => {
    const navigate = useNavigate();

    // Deceased Information
    const [deceasedName, setDeceasedName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfDeath, setDateOfDeath] = useState(new Date());

    // Medical Information
    const [deceasedHospitalized, setDeceasedHospitalized] = useState(false);
    const [pastPhysicianNames, setPastPhysicianNames] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = {deceasedName, dateOfBirth, dateOfDeath, deceasedHospitalized, pastPhysicianNames};
        console.log(JSON.stringify(form));

        const url = 'http://localhost:8080/form-info/post';
        axios.post(url, form).then(() => {});
    }
    //
    // const getInfo = () => {
    let claimId = '1001';
    const url2 = 'http://localhost:8080/form-info/' + claimId;
    axios.get(url2, claimId).then((res) => {
        console.log(res);
        setDeceasedName(res.data.deceasedName);
        setDeceasedHospitalized(new Boolean(res.data.deceasedHospitalized));
        setPastPhysicianNames(res.data.pastPhysicianNames);
        // setDateOfDeath(res.data.dateOfDeath)
        setDateOfDeath(new Date("2011-10-10T14:48:00.000+09:00"));





    });
    // }
    function FormSubmittedView() {
        navigate('/FormSubmittedView');
    }

    return (
        <Container>
            <FormContainer>
                <div className="form">

                    <form onSubmit={handleSubmit}>

                        {/* DECEASED INFORMATION */}
                        <div className="deceasedInfo">
                            <h3>Deceased Information</h3>
                            <label>Name of deceased (first, middle, last):</label>
                            <input type="text" placeholder="Name" value={deceasedName} onChange={(e) => setDeceasedName(e.target.value)} /><br /><br />

                            <label>Date of birth:</label>
                            <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                            <label>Date of death:</label>
                            <input type="date" value={dateOfDeath} onChange={(e) => setDateOfDeath(e.target.value)}/><br /><br />
                        </div>

                        {/* MEDICAL INFORMATION */}
                        <div className="medicalInfo">
                            <h3>Medical Information</h3>
                            <p>Was deceased hospitalized?</p>
                            <input type="radio" name="hospitalized" value={deceasedHospitalized} onChange={(e) => setDeceasedHospitalized(true)}/>
                            <label>Yes</label>
                            <input type="radio" name="hospitalized" value={deceasedHospitalized} onChange={(e) => setDeceasedHospitalized(false)}/>
                            <label>No</label>
                        </div>

                        <button onClick={FormSubmittedView}>Submit</button>
                    </form>
                </div>
            </FormContainer>
        </Container>
    );
}

export default Form;