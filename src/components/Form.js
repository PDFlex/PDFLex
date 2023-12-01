import { useState } from "react";
import styled from 'styled-components';
import axios from "axios";

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin: auto 15rem;
    /* border: 0.05rem solid #a9a9a9; */
`

const Section = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem;
`

const Heading = styled.h3`
    
`

const Label = styled.label`
    grid-column: span ${props => props.span};
    margin: 0.3rem 0.3rem 0;
`

const Input = styled.input`
    padding: 0.5rem 1rem;
    margin: 0.1rem 0.3rem 0.3rem;
    border: 0.05rem solid #a9a9a9;
    border-radius: 0.2rem;
    box-sizing: border-box;
    &:focus {
        outline: 0.1rem solid #949494;
    }
    grid-column: span ${props => props.span};
`

const Form = () => {
    // Deceased Information
    const [deceasedName, setDeceasedName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfDeath, setDateOfDeath] = useState(new Date());

    // Medical Information
    const [causeOfDeath, setCauseOfDeath] = useState('');
    const [deceasedHospitalized, setDeceasedHospitalized] = useState(false);
    const [hospitalizationDate, setHospitalizationDate] = useState(new Date());
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [attendingPhysicianName, setAttendingPhysicianName] = useState('');
    const [attendingPhysicianAddress, setAttendingPhysicianAddress] = useState('');
    const [attendingPhysicianContactNumber, setAttendingPhysicianContactNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const form = {
            deceasedName, dateOfBirth, dateOfDeath
        };
        console.log(JSON.stringify(form));

        const url = 'http://localhost:8080/form-info/post';
        axios.post(url, form).then(() => {});
    }

    return (
        <FormContainer>
            {/* DECEASED INFORMATION */}
            <Section>
                <Heading>Deceased Information</Heading>
                <Label span = {2}> Name of deceased (first, middle, last)</Label>
                <Input type="text" span = {2} value={deceasedName} onChange={(e) => setDeceasedName(e.target.value)}/>

                <Label span = {1}>Date of birth </Label>
                <Label span = {1}> Date of death </Label>
                <Input type="date" span = {1} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                <Input type="date" span = {1} value={dateOfDeath} onChange={(e) => setDateOfDeath(e.target.value)}/>
            </Section>

            {/* MEDICAL INFORMATION */}
            <Section>
                <Heading>Medical Information</Heading>
                <Label span = {2}> Cause of Death</Label>
                <Input type="text" span = {2} value={causeOfDeath} onChange={(e) => setCauseOfDeath(e.target.value)}/>

                <Label span = {2}> Was deceased hospitalized?</Label>
                <Label span = {2}>
                    <Input type="radio" span = {2} name="hospitalized" value={deceasedHospitalized} onChange={(e) => setDeceasedHospitalized(true)}/>
                    Yes
                </Label>
                <Label span = {2}>
                    <Input type="radio" span = {1} name="hospitalized" value={deceasedHospitalized} onChange={(e) => setDeceasedHospitalized(false)}/>
                    No
                </Label>

                <Label span = {2}>If yes, date admitted</Label>
                <Input type="date" span = {2} value={hospitalizationDate} onChange={(e) => setHospitalizationDate(e.target.value)}/>

                <Label span = {1}> Name of hospital </Label>
                <Label span = {1}> Address (street, city, province, postal code) </Label>
                <Input type="date" span = {1} value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}/>
                <Input type="date" span = {1} value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)}/>

                <Label span = {2}> Name of attending physician at time of death </Label>
                <Input type="text" span = {2} value={attendingPhysicianName} onChange={(e) => setAttendingPhysicianName(e.target.value)}/>

                <Label span = {1}> Address (street, city, province, postal code) </Label>
                <Label span = {1}> Telephone number </Label>
                <Input type="text" span = {1} value={attendingPhysicianAddress} onChange={(e) => setAttendingPhysicianAddress(e.target.value)}/>
                <Input type="text" span = {1} value={attendingPhysicianContactNumber} onChange={(e) => setAttendingPhysicianContactNumber(e.target.value)}/>


            </Section>
        </FormContainer>
    );
}
 
export default Form;