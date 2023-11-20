import { useState } from "react";
import formStyles from "./Form.module.scss";
import axios from "axios";

const Form = () => {
    const [claimNum, setClaimNum] = useState(0);

    // Deceased Information
    const [name, setName] = useState('');
    const [doB, setDOB] = useState(new Date());
    const [doD, setDOD] = useState(new Date());

    // Medical Information
    const [deathCause, setDeathCase] = useState('');
    const [wasHospitalized, setWasHospitalized] = useState(false);
    const [hospitalizationDate, setHospitalizationDate] = useState(new Date());
    const [hospitalName, setHospitalName] = useState('');
    const [hospitalAddress, setHospitalAddress] = useState('');
    const [attendingPhysicianName, setAttendingPhysicianName] = useState('');
    const [attendingPhysicianAddress, setAttendingPhysicianAddress] = useState('');
    const [attendingPhysicianPhone, setAttendingPhysicianPhone] = useState('');
    const [familyPhysicianName, setFamilyPhysicianName] = useState('');
    const [familyPhysicianAddress, setFamilyPhysicianAddress] = useState('');
    const [familyPhysicianPhone, setFamilyPhysicianPhone] = useState('');

    //  Employment Information
    const [occupation, setOccupation] = useState('');
    const [dateLastWorked, setDateLastWorked] = useState(new Date());
    const [employer, setEmployer] = useState('');
    const [employerAddress, setEmployerAddress] = useState('');
    const [employerPhone, setEmployerPhone] = useState('');
    const [reasonStoppedWorking, setReasonStoppedWorking] = useState('');

    // Next-Of-Kin (NOK) Information
    const [NOKName, setNOKName] = useState('');
    const [relationshipToInsured, setRelationshipToInsured] = useState('');
    const [NOKAddress, setNOKAddress] = useState('');
    const [NOKPhone, setNOKPhone] = useState('');

    // Authorization
    const [NOKSignature, setNOKSignature] = useState('');
    const [dateSigned, setDateSigned] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        const deceasedInfo = {name, doB, doD};

        const attendingPhysicianInfo = {attendingPhysicianName, attendingPhysicianAddress, attendingPhysicianPhone};
        const familyPhysicianInfo = {familyPhysicianName, familyPhysicianAddress, familyPhysicianPhone};
        const medicalInfo = {
            deathCause, wasHospitalized, hospitalizationDate, hospitalName, hospitalAddress,
            attendingPhysicianInfo, familyPhysicianInfo};

        const employmentInfo = {occupation, dateLastWorked, employer, employerAddress, employerPhone, reasonStoppedWorking};
        const NOKInfo = {NOKName, relationshipToInsured, NOKAddress, NOKPhone};
        const authorization = {NOKSignature, dateSigned};
        
        const form = {claimNum, deceasedInfo, medicalInfo, employmentInfo, NOKInfo, authorization};
        console.log(JSON.stringify(form));

        const url = 'http://localhost:8080/form-info/post';
        axios.post(url, form).then(() => {});
    }

    const getInfo = () => {
        const url2 = 'http://localhost:8080/form-info/get';
        axios.get(url2).then((res) => {
            console.log(res)
        });
    }
    
    return (
        <div className="form">
            <h2>Life Claim Information Request</h2>

            <button onClick={getInfo}>Create form</button>

            <form onSubmit={handleSubmit} className={formStyles.form}>

                {/* HEADER */}
                <div className="header">
                    <label>Claim Number</label>
                    <input type="number" placeholder="Claim Number" value={claimNum} onChange={(e) => setClaimNum(e.target.value)}/><br /><br />
                </div>

                {/* DECEASED INFORMATION */}
                <div className="deceasedInfo">
                    <h3 className={formStyles.h3}>Deceased Information</h3>
                    <label>Name of deceased (first, middle, last):</label>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />

                    <label>Date of birth:</label>
                    <input type="date" value={doB} onChange={(e) => setDOB(e.target.value)}/>
                    <label>Date of death:</label>
                    <input type="date" value={doD} onChange={(e) => setDOD(e.target.value)}/><br /><br />
                </div>

                {/* MEDICAL INFORMATION */}
                <div className="medicalInfo">
                    <h3>Medical Information</h3>
                    <label>Cause of death:</label>
                    <input type="text" value={deathCause} onChange={(e) => setDeathCase(e.target.value)}/><br /><br />

                    <p>Was deceased hospitalized?</p>
                    <input type="radio" name="hospitalized" value={wasHospitalized} onChange={(e) => setWasHospitalized(true)}/>
                    <label>Yes</label>
                    <input type="radio" name="hospitalized" value={wasHospitalized} onChange={(e) => setWasHospitalized(false)}/>
                    <label>No</label>
                    <label>If yes, date admitted:</label>
                    <input type="date" value={hospitalizationDate} onChange={(e) => setHospitalizationDate(e.target.value)}/><br /><br />

                    <label>Name of hospital</label>
                    <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}/>

                    <label>Address (street, city, province, postal code)</label>
                    <input type="text" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)}/><br /><br />

                    <label>Name of attending physician at time of death</label>
                    <input type="text" value={attendingPhysicianName} onChange={(e) => setAttendingPhysicianName(e.target.value)}/><br /><br />

                    <label>Address (street, city, province, postal code) (Attending physician)</label>
                    <input type="text" value={attendingPhysicianAddress} onChange={(e) => setAttendingPhysicianAddress(e.target.value)}/>

                    <label>Telephone Number (Attending physician) </label>
                    <input type="text" value={attendingPhysicianPhone} onChange={(e) => setAttendingPhysicianPhone(e.target.value)}/><br /><br />

                    <label>Name of family physican</label>
                    <input type="text" value={familyPhysicianName} onChange={(e) => setFamilyPhysicianName(e.target.value)}/><br /><br />

                    <label>Address (street, city, province, postal code) (Family physician)</label>
                    <input type="text" value={familyPhysicianAddress} onChange={(e) => setFamilyPhysicianAddress(e.target.value)}/>

                    <label>Telephone Number (Family physician)</label>
                    <input type="text" value={familyPhysicianPhone} onChange={(e) => setFamilyPhysicianPhone(e.target.value)}/><br /><br />

                    {/* TODO: Adding physicians from the past two years */}
                </div>

                {/* EMPLOYMENT INFORMATION */}
                <div className="employmentInfo">
                    <h3>Employment Information</h3>
                    <label>Occupation</label>
                    <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>

                    <label>Date last worked</label>
                    <input type="date" value={dateLastWorked} onChange={(e) => setDateLastWorked(e.target.value)}/><br /><br />

                    <label>Employer</label>
                    <input type="text" value={employer} onChange={(e) => setEmployer(e.target.value)}/><br /><br />

                    <label>Address (street, city, province, postal code) (Employer)</label>
                    <input type="text" value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)}/>

                    <label>Telephone Number (Employer)</label>
                    <input type="text" value={employerPhone} onChange={(e) => setEmployerPhone(e.target.value)}/><br /><br />

                    <p>Reason insured stopped working</p>
                    <input type="radio" name="reasonStoppedWorking" value={reasonStoppedWorking} onChange={(e) => setReasonStoppedWorking("Normal retirement")}/>
                    <label>Normal retirement</label>
                    <input type="radio" name="reasonStoppedWorking" value={reasonStoppedWorking} onChange={(e) => setReasonStoppedWorking("Disability retirement")}/>
                    <label>Disability retirement</label>
                    <input type="radio" name="reasonStoppedWorking" value={reasonStoppedWorking} onChange={(e) => setReasonStoppedWorking("Illness")}/>
                    <label>Illness</label>
                    <input type="radio" name="reasonStoppedWorking" value={reasonStoppedWorking} onChange={(e) => setReasonStoppedWorking("Death")}/>
                    <label>Death</label>
                    <label>Other (please specify)</label>
                    <input type="text" value={reasonStoppedWorking} onChange={(e) => setReasonStoppedWorking(e.target.value)}/><br /><br />
                </div>

                {/* Next of Kin Information */}
                <div className="NOKInfo">
                    <h3>Next of Kin Information</h3>
                        <label>Name of next-of-kin</label>
                        <input type="text" value={NOKName} onChange={(e) => setNOKName(e.target.value)}/><br /><br />

                        <label>Relationship to insured</label>
                        <input type="text" value={relationshipToInsured} onChange={(e) => setRelationshipToInsured(e.target.value)}/>

                        <label>Address</label>
                        <input type="text" value={NOKAddress} onChange={(e) => setNOKAddress(e.target.value)}/>

                        <label>Telephone number</label>
                        <input type="text" value={NOKPhone} onChange={(e) => setNOKPhone(e.target.value)}/><br /><br />
                </div>

                {/* Authorization */}
                <div className="authorization">
                    <h3>Authorization</h3>
                    <p>The statements above are true and complete. I/we certify that I/we are authorized as the Next of Kin or
                        authorized representative of the Deceased or the Deceased’s estate, to provide, obtain, and access this
                        information and agree that the Insurer may reply upon them as part of the proofs of death under the claim
                        made above. Any physician who has attended the Deceased, and/or any hospital or employer(s) of the
                        Deceased or other institution in which the Deceased was treated or confined, is hereby authorized to
                        furnish Canadian Premier Life Insurance Company or its representative (cumulatively Insurer), any and
                        all information and records with respect to any illness or injury, medical history, consultations,
                        prescriptions, or treatments pertaining to the Deceased. Such information may be included as part of the
                        proofs of death submitted to the Insurer. A photocopy of this authorization shall be considered as
                        effective and valid as the original. I understand that as next-of-kin I may request a copy of this
                        authorization. This authorization shall be valid for the duration of the claim.</p>

                    <label>Signature of next-of-kin</label>
                    <input type="text" value={NOKSignature} onChange={(e) => setNOKSignature(e.target.value)}/>

                    <label>Date signed</label>
                    <input type="date" value={dateSigned} onChange={(e) => setDateSigned(e.target.value)}/><br /><br />


                    <p>By furnishing this form or any other form, the Company does not admit that any coverage is in force nor waive any of its rights or defenses.</p>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;