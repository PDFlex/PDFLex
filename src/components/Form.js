import { useState } from "react";
import formStyles from "./Form.module.css"

const Form = () => {
    const [claimNum, setClaimNum] = useState(0); // what is the default value of a number?

    // Deceased Information
    const [name, setName] = useState('');
    const [doB, setDOB] = useState(new Date());
    const [doD, setDOD] = useState(new Date());

    // Medical Information
    const [deathCause, setDeathCase] = useState('');
    const [wasHospitalized, setWasHospitalized] = useState(''); // TODO: Fix
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
        const deceasedInfo = {name, doB, doD}
        const medicalInfo = {deathCause}
        const form = {deceasedInfo, medicalInfo};
        console.log(JSON.stringify(form))
    }
    
    return (
        <div className="form">
            <h2>Life Claim Information Request</h2>

            <form onSubmit={handleSubmit} className={formStyles.form}>

                {/* HEADER */}
                <label>Claim Number</label>
                <input type="number" placeholder="Claim Number" value={claimNum} onChange={(e) => setClaimNum(e.target.value)}/>
                <br /><br />

                {/* DECEASED INFORMATION */}
                <h3 className={formStyles.h3}>Deceased Information</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />

                <label>Name of deceased (first, middle, last):</label><br /><br />

                <label>Date of birth:</label>
                <input type="date" value={doB} onChange={(e) => setDOB(e.target.value)}/>
                <label>Date of death:</label>
                <input type="date" value={doD} onChange={(e) => setDOD(e.target.value)}/><br /><br />

                {/* MEDICAL INFORMATION */}
                <h3>Medical Information</h3>
                <label>Cause of death:</label>
                <input type="text" value={deathCause} onChange={(e) => setDeathCase(e.target.value)}/><br /><br />
                
                
                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;