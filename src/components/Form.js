import {useContext, useEffect, useState} from "react";
import styled from 'styled-components';
import axios from "axios";
import {UserIdContext} from "../App";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    display: flex;
    background-color: #bdd4bc;
`

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2rem 15rem;
    padding: 1.5rem 1.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem 0.05rem grey;
`

const Section = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 1rem;
`

const Title = styled.h2`
    align-self: center;
`

const Heading = styled.h4`
    grid-column: span 2;
`

const Label = styled.label`
    grid-column: span ${props => props.span};
    margin: 0.3rem 0.3rem 0;
`

const BoldedLabel = styled.label`
    font-size: 1.05rem;
    font-weight: 500;
    margin: 1rem 0.3rem 0.1rem;
    grid-column: span 2;
`

const Input = styled.input`
    padding: 0.5rem 1rem;
    margin: 0.1rem 0.3rem 0.3rem;
    border: 0.05rem solid #a9a9a9;
    border-radius: 0.2rem;
    box-sizing: border-box;
    &:focus {
        outline: 0.07rem solid #949494;
    }
    &::-webkit-inner-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    } 
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
    grid-column: span ${props => props.span};
    
`

const Paragraph = styled.p`
    grid-column: span 2;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 1.5em;
    background-color: #11a346;
    border: none;
    margin: 1rem;
    padding: 1% 2%;
    font-size: 1.3em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
` 

const Form = () => {
    const navigate = useNavigate();

    // CLAIM CHECKLIST
    const {claimId} = useContext(UserIdContext);
    const [completedDeathCertificate, setCompletedDeathCertificate] = useState(false);
    const [attachedDeathCertificate, setAttachedDeathCertificate] = useState(false);
    const [completedClaimSubmission, setCompletedClaimSubmission] = useState(false);

    // DECEASED INFORMATION
    const [deceasedName, setDeceasedName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split('T')[0]);
    const [dateOfDeath, setDateOfDeath] = useState(new Date().toISOString().split('T')[0]);

    // MEDICAL INFORMATION
    const [causeOfDeath, setCauseOfDeath] = useState('');
    const [deceasedHospitalized, setDeceasedHospitalized] = useState(false);
    const [hospitalizationDate, setHospitalizationDate] = useState(new Date().toISOString().split('T')[0]);
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');

    const [attendingPhysicianName, setAttendingPhysicianName] = useState('');
    const [attendingPhysicianAddress, setAttendingPhysicianAddress] = useState('');
    const [attendingPhysicianContactNumber, setAttendingPhysicianContactNumber] = useState('');

    const [familyPhysicianName, setFamilyPhysicianName] = useState('');
    const [familyPhysicianAddress, setFamilyPhysicianAddress] = useState('');
    const [familyPhysicianContactNumber, setFamilyPhysicianContactNumber] = useState('');

    const [pastPhysicianName1, setPastPhysicianName1] = useState('');
    const [pastPhysicianAddress1, setPastPhysicianAddress1] = useState('');
    const [pastPhysicianName2, setPastPhysicianName2] = useState('');
    const [pastPhysicianAddress2, setPastPhysicianAddress2] = useState('');
    const [pastPhysicianName3, setPastPhysicianName3] = useState('');
    const [pastPhysicianAddress3, setPastPhysicianAddress3] = useState('');

    const pastPhysicianNames = [pastPhysicianName1, pastPhysicianName2, pastPhysicianName3];
    const pastPhysicianAddresses = [pastPhysicianAddress1, pastPhysicianAddress2, pastPhysicianAddress3];

    // EMPLOYMENT INFORMATION
    const [occupation, setOccupation] = useState('');
    const [dateLastWorked, setDateLastWorked] = useState(new Date().toISOString().split('T')[0]);
    const [employer, setEmployer] = useState('');
    const [workAddress, setWorkAddress] = useState('');
    const [workContactNumber, setWorkContactNumber] = useState('');
    const [reasonInsuredStoppedWorkingRadio, setReasonInsuredStoppedWorkingRadio] = useState('');
    const [reasonInsuredStoppedWorkingOther, setReasonInsuredStoppedWorkingOther] = useState('');

    // NEXT OF KIN INFORMATION
    const [nameofKin, setNameOfKin] = useState('');
    const [relationshipToInsured, setRelationshipToInsured] = useState('');
    const [kinAddress, setKinAddress] = useState('');
    const [kinContactNumber, setKinContactNumber] = useState('');
    const [kinSignature, setKinSignature] = useState('');
    const [dateSigned, setDateSigned] = useState(new Date().toISOString().split('T')[0]);

    // Function that sends the form information to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        let reasonInsuredStoppedWorking = '';

        if (reasonInsuredStoppedWorkingRadio === 'Other') {
            reasonInsuredStoppedWorking = reasonInsuredStoppedWorkingOther;
        } else {
            reasonInsuredStoppedWorking = reasonInsuredStoppedWorkingRadio;
        }
        
        const form = {
            completedDeathCertificate, attachedDeathCertificate, completedClaimSubmission,
            deceasedName, dateOfBirth, dateOfDeath,
            causeOfDeath, deceasedHospitalized, hospitalizationDate, hospitalName, hospitalAddress,
            attendingPhysicianName, attendingPhysicianAddress, attendingPhysicianContactNumber,
            familyPhysicianName, familyPhysicianAddress, familyPhysicianContactNumber,
            pastPhysicianNames, pastPhysicianAddresses,
            occupation, dateLastWorked, employer,
            workAddress, workContactNumber, reasonInsuredStoppedWorking,
            nameofKin, relationshipToInsured, kinAddress, kinContactNumber, kinSignature, dateSigned
        };

        const url = 'https://pdflex-backend.duckdns.org/form-info/' + claimId.toString();
        axios.post(url, form).then(() => {
            navigate('/ViewFormsDashboard');
        });

    }

    useEffect(() => {
        const url = 'https://pdflex-backend.duckdns.org/retrieve-info/' + claimId.toString();
        axios.get(url, claimId).then((res) => {
                setCompletedDeathCertificate(res.data.completedDeathCertificate);
                setAttachedDeathCertificate(res.data.attachedDeathCertificate);
                setCompletedClaimSubmission(res.data.completedClaimSubmission);
                setDeceasedName(res.data.deceasedName);
                setDateOfBirth(res.data.dateOfBirth);
                setDateOfDeath(res.data.dateOfDeath);
                setCauseOfDeath(res.data.causeOfDeath);
                setDeceasedHospitalized(res.data.deceasedHospitalized);
                setHospitalizationDate(res.data.hospitalizationDate);
                setHospitalName(res.data.hospitalName);
                setHospitalAddress(res.data.hospitalAddress);
                setAttendingPhysicianName(res.data.attendingPhysicianName);
                setAttendingPhysicianAddress(res.data.attendingPhysicianAddress);
                setAttendingPhysicianContactNumber(res.data.attendingPhysicianContactNumber);
                setFamilyPhysicianName(res.data.familyPhysicianName);
                setFamilyPhysicianAddress(res.data.familyPhysicianAddress);
                setFamilyPhysicianContactNumber(res.data.familyPhysicianContactNumber);
                setPastPhysicianName1(res.data.pastPhysicianNames[0]);
                setPastPhysicianName2(res.data.pastPhysicianNames[1]);
                setPastPhysicianName3(res.data.pastPhysicianNames[2]);
                setPastPhysicianAddress1(res.data.pastPhysicianAddresses[0]);
                setPastPhysicianAddress2(res.data.pastPhysicianAddresses[1]);
                setPastPhysicianAddress3(res.data.pastPhysicianAddresses[2]);
                setOccupation(res.data.occupation);
                setDateLastWorked(res.data.dateLastWorked);
                setEmployer(res.data.employer);
                setWorkAddress(res.data.workAddress);
                setWorkContactNumber(res.data.workContactNumber);
                setReasonInsuredStoppedWorkingRadio(res.data.reasonInsuredStoppedWorking);
                setNameOfKin(res.data.nameOfKin);
                setRelationshipToInsured(res.data.relationshipToInsured);
                setKinAddress(res.data.kinAddress);
                setKinContactNumber(res.data.kinContactNumber);
                setKinSignature(res.data.kinSignature);
                setDateSigned(res.data.dateSigned)

            console.log(res);
        });
    // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit}>
            <Title>Life Claim Information Request</Title>
                
                {/* CLAIM CHECKLIST */}
                <Section>
                    <Heading> Claim Checklist </Heading>

                    <Label span = {2}>
                        <Input type="checkbox" span = {2} checked={completedDeathCertificate} onChange={() => setCompletedDeathCertificate(true)}/>
                        Has the Certification of Death form been completed by the attending physician, coroner, or family doctor?
                    </Label>
                    <Label span = {2}>
                        <Input type="checkbox" span = {2} checked={attachedDeathCertificate} onChange={() => setAttachedDeathCertificate(true)}/>
                        Attach an original or a copy of the death certificate.
                    </Label>
                    <Label span = {2}>
                        <Input type="checkbox" span = {2} checked={completedClaimSubmission} onChange={() => setCompletedClaimSubmission(true)}/>
                        Has the lender either completed the claim submission online or completed the Statement of Lending Institution Form?
                    </Label>
                </Section>

                {/* DECEASED INFORMATION */}
                <Section>
                    <Heading>Deceased Information</Heading>
                    <Label span = {2}> Name of deceased (first, middle, last)</Label>
                    <Input type="text" span = {2} value={deceasedName} onChange={(e) => setDeceasedName(e.target.value)} required/>

                    <Label span = {1}>Date of birth </Label>
                    <Label span = {1}> Date of death </Label>
                    <Input type="date" span = {1} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
                    <Input type="date" span = {1} value={dateOfDeath} onChange={(e) => setDateOfDeath(e.target.value)} required/>
                </Section>

                {/* MEDICAL INFORMATION */}
                <Section>
                    <Heading>Medical Information</Heading>
                    <Label span = {2}> Cause of Death</Label>
                    <Input type="text" span = {2} value={causeOfDeath} onChange={(e) => setCauseOfDeath(e.target.value)} required/>

                    <Label span = {2}> Was deceased hospitalized?</Label>
                    <Label span = {2}>
                        <Input type="radio" span = {2} name="hospitalized" value={"true"} checked={deceasedHospitalized === true}  onChange={() => setDeceasedHospitalized(true)} required/>
                        Yes
                    </Label>
                    <Label span = {2}>
                        <Input type="radio" span = {1} name="hospitalized" value={"false"} checked={deceasedHospitalized === false}  onChange={() => setDeceasedHospitalized(false)} required/>
                        No
                    </Label>

                    <Label span = {2}>If yes, date admitted</Label>
                    <Input type="date" span = {2} value={hospitalizationDate} onChange={(e) => setHospitalizationDate(e.target.value)}/>

                    <Label span = {1}> Name of hospital </Label>
                    <Label span = {1}> Address (street, city, province, postal code) </Label>
                    <Input type="text" span = {1} value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} required/>
                    <Input type="text" span = {1} value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} required/>

                    <Label span = {2}> Name of attending physician at time of death </Label>
                    <Input type="text" span = {2} value={attendingPhysicianName} onChange={(e) => setAttendingPhysicianName(e.target.value)} required/>

                    <Label span = {1}> Address (street, city, province, postal code) </Label>
                    <Label span = {1}> Telephone number </Label>
                    <Input type="text" span = {1} value={attendingPhysicianAddress} onChange={(e) => setAttendingPhysicianAddress(e.target.value)} required/>
                    <Input type="text" span = {1} value={attendingPhysicianContactNumber} onChange={(e) => setAttendingPhysicianContactNumber(e.target.value)} required/>

                    <Label span = {2}> Name of family physician </Label>
                    <Input type="text" span = {2} value={familyPhysicianName} onChange={(e) => setFamilyPhysicianName(e.target.value)} required/>

                    <Label span = {1}> Address (street, city, province, postal code) </Label>
                    <Label span = {1}> Telephone number </Label>
                    <Input type="text" span = {1} value={familyPhysicianAddress} onChange={(e) => setFamilyPhysicianAddress(e.target.value)} required/>
                    <Input type="text" span = {1} value={familyPhysicianContactNumber} onChange={(e) => setFamilyPhysicianContactNumber(e.target.value)} required/>

                    <BoldedLabel> List the name and address of all physicians who treated the insured in the last 2 years </BoldedLabel>
                    <Label span = {1}> Physician Name </Label>
                    <Label span = {1}> Physician Address </Label>
                    <Input type="text" span = {1} value={pastPhysicianName1} onChange={(e) => setPastPhysicianName1(e.target.value)}/>
                    <Input type="text" span = {1} value={pastPhysicianAddress1} onChange={(e) => setPastPhysicianAddress1(e.target.value)}/>
                    <Label span = {1}> Physician Name </Label>
                    <Label span = {1}> Physician Address </Label>
                    <Input type="text" span = {1} value={pastPhysicianName2} onChange={(e) => setPastPhysicianName2(e.target.value)}/>
                    <Input type="text" span = {1} value={pastPhysicianAddress2} onChange={(e) => setPastPhysicianAddress2(e.target.value)}/>
                    <Label span = {1}> Physician Name </Label>
                    <Label span = {1}> Physician Address </Label>
                    <Input type="text" span = {1} value={pastPhysicianName3} onChange={(e) => setPastPhysicianName3(e.target.value)}/>
                    <Input type="text" span = {1} value={pastPhysicianAddress3} onChange={(e) => setPastPhysicianAddress3(e.target.value)}/>
                </Section>

                {/* EMPLOYMENT INFORMATION */}
                <Section>
                    <Heading>Employment Information</Heading>
                    <Label span = {1}> Occupation </Label>
                    <Label span = {1}> Date last worked </Label>
                    <Input type="text" span = {1} value={occupation} onChange={(e) => setOccupation(e.target.value)} required/>
                    <Input type="date" span = {1} value={dateLastWorked} onChange={(e) => setDateLastWorked(e.target.value)} required/>

                    <Label span = {2}> Employer </Label>
                    <Input type="text" span = {2} value={employer} onChange={(e) => setEmployer(e.target.value)} required/>

                    <Label span = {1}> Address (street, city, province, postal code) </Label>
                    <Label span = {1}> Telephone number </Label>
                    <Input type="text" span = {1} value={workAddress} onChange={(e) => setWorkAddress(e.target.value)} required/>
                    <Input type="text" span = {1} value={workContactNumber} onChange={(e) => setWorkContactNumber(e.target.value)} required/>

                    <Label span = {2}> Reason insured stopped working</Label>
                    <Label span = {2}>
                        <Input type="radio" span = {2} name="reasonStoppedWorking" value={"Normal retirement"} checked={reasonInsuredStoppedWorkingRadio === "Normal retirement"} onChange={() => setReasonInsuredStoppedWorkingRadio("Normal retirement")}/>
                        Normal retirement
                    </Label>
                    <Label span = {2}>
                        <Input type="radio" span = {1} name="reasonStoppedWorking" value={"Disability retirement"} checked={reasonInsuredStoppedWorkingRadio === "Disability retirement"} onChange={() => setReasonInsuredStoppedWorkingRadio("Disability retirement")}/>
                        Disability retirement
                    </Label>
                    <Label span = {2}>
                        <Input type="radio" span = {2} name="reasonStoppedWorking" value={"Illness"} checked={reasonInsuredStoppedWorkingRadio === "Illness"} onChange={() => setReasonInsuredStoppedWorkingRadio("Illness")}/>
                        Illness
                    </Label>
                    <Label span = {2}>
                        <Input type="radio" span = {1} name="reasonStoppedWorking" value={"Death"} checked={reasonInsuredStoppedWorkingRadio === "Death"} onChange={() => setReasonInsuredStoppedWorkingRadio("Death")}/>
                        Death
                    </Label>
                    <Label span = {2}>
                        <Input type="radio" span = {1} name="reasonStoppedWorking" value={"Other"} checked={reasonInsuredStoppedWorkingRadio === "Other"} onChange={() => setReasonInsuredStoppedWorkingRadio("Other")}/>
                        Other (please specify):
                    </Label>
                    <Input type="text" span = {2} value={reasonInsuredStoppedWorkingOther} onChange={(e) => setReasonInsuredStoppedWorkingOther(e.target.value)}/>
                </Section>

                {/* NEXT OF KIN INFORMATION */}
                <Section>
                    <Heading>Next of Kin Information</Heading>
                    <Label span = {1}> Name of next-of-kin </Label>
                    <Label span = {1}> Relationship to insured </Label>
                    <Input type="text" span = {1} value={nameOfKin} onChange={(e) => setNameOfKin(e.target.value)} required/>
                    <Input type="text" span = {1} value={relationshipToInsured} onChange={(e) => setRelationshipToInsured(e.target.value)} required/>

                    <Label span = {1}> Address </Label>
                    <Label span = {1}> Telephone number </Label>
                    <Input type="text" span = {1} value={kinAddress} onChange={(e) => setKinAddress(e.target.value)} required/>
                    <Input type="text" span = {1} value={kinContactNumber} onChange={(e) => setKinContactNumber(e.target.value)} required/>
                </Section>

                {/* AUTHORIZATION */}
                <Section>
                    <Heading>Authorization</Heading>
                    <Paragraph>
                        The statements above are true and complete. I/we certify that I/we are authorized as the Next of Kin or
                        authorized representative of the Deceased or the Deceased’s estate, to provide, obtain, and access this
                        information and agree that the Insurer may reply upon them as part of the proofs of death under the claim
                        made above. Any physician who has attended the Deceased, and/or any hospital or employer(s) of the
                        Deceased or other institution in which the Deceased was treated or confined, is hereby authorized to
                        furnish Canadian Premier Life Insurance Company or its representative (cumulatively Insurer), any and
                        all information and records with respect to any illness or injury, medical history, consultations,
                        prescriptions, or treatments pertaining to the Deceased. Such information may be included as part of the
                        proofs of death submitted to the Insurer. A photocopy of this authorization shall be considered as
                        effective and valid as the original. I understand that as next-of-kin I may request a copy of this
                        authorization. This authorization shall be valid for the duration of the claim.
                    </Paragraph>

                    <Label span = {1}> Signature of next-of-kin </Label>
                    <Label span = {1}> Date signed </Label>
                    <Input type="text" span = {1} value={kinSignature} onChange={(e) => setKinSignature(e.target.value)} required/>
                    <Input type="date" span = {1} value={dateSigned} onChange={(e) => setDateSigned(e.target.value)} required/>
                </Section>

                <ButtonContainer>
                    <Button>Submit form</Button>
                </ButtonContainer>
            </FormContainer>
        </Container>
    );
}
 
export default Form;