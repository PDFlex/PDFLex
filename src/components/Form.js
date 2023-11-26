import { useState } from "react";
import axios from "axios";

const Form = () => {
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

    const getInfo = () => {
        const url2 = 'http://localhost:8080/form-info/get';
        axios.get(url2).then((res) => {
            console.log(res)
        });
    }
    
    return (
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

                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;