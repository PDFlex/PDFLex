import { useState } from "react";
import formStyles from "./Form.module.css"
import axios from "axios";

const Form = () => {
    const [claimNum, setClaimNum] = useState(0); // what is the default value of a number?

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

    // TODO: Next of Kin Informatin AND Authorization

    const handleSubmit = (e) => {
        e.preventDefault();
        const deceasedInfo = {name, doB, doD};

        const attendingPhysicianInfo = {attendingPhysicianName, attendingPhysicianAddress, attendingPhysicianPhone};
        const familyPhysicianInfo = {familyPhysicianName, familyPhysicianAddress, familyPhysicianPhone};
        const medicalInfo = {
            deathCause, wasHospitalized, hospitalizationDate, hospitalName, hospitalAddress,
            attendingPhysicianInfo, familyPhysicianInfo};
        
        const form = {name};
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
                    <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}/><br /><br />
                    
                    <label>Address (street, city, province, postal code)</label>
                    <input type="text" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)}/><br /><br />

                    <label>Name of attending physician at time of death</label>
                    <input type="text" value={attendingPhysicianName} onChange={(e) => setAttendingPhysicianName(e.target.value)}/><br /><br />

                    <label>Address (street, city, province, postal code) (Attending physician)</label>
                    <input type="text" value={attendingPhysicianAddress} onChange={(e) => setAttendingPhysicianAddress(e.target.value)}/><br /><br />

                    <label>Telephone Number (Attending physician) </label>
                    <input type="text" value={attendingPhysicianPhone} onChange={(e) => setAttendingPhysicianPhone(e.target.value)}/><br /><br />

                    <label>Name of family physican</label>
                    <input type="text" value={familyPhysicianName} onChange={(e) => setFamilyPhysicianName(e.target.value)}/><br /><br />

                    <label>Address (street, city, province, postal code) (Family physician)</label>
                    <input type="text" value={familyPhysicianAddress} onChange={(e) => setFamilyPhysicianAddress(e.target.value)}/><br /><br />

                    <label>Telephone Number (Family physician)</label>
                    <input type="text" value={familyPhysicianPhone} onChange={(e) => setFamilyPhysicianPhone(e.target.value)}/><br /><br />

                    {/* TODO: Adding physicians from the past two years */}
                </div>

                {/* EMPLOYMENT INFORMATION */}

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;