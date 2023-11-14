import { useState } from "react";

const Form = () => {
    const [claimNum, setClaimNum] = useState(0); // what is the default value of a number?
    const [name, setName] = useState('');
    const [doB, setDOB] = useState(new Date());
    const [doD, setDOD] = useState(new Date());
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
    const [occupation, setOccupation] = useState('');
    const [dateLastWorked, setDateLastWorked] = useState(new Date());
    const [employer, setEmployer] = useState('');
    const [employerAddress, setEmployerAddress] = useState('');
    const [employerPhone, setEmployerPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {name, doB, doD, deathCause, wasHospitalized, hospitalizationDate, hospitalName, hospitalAddress};
        console.log(JSON.stringify(form))

        // fetch('https://localhost:8080', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json"},
        //     body: JSON.stringify(form)
        // }).then(() => {
        //     console.log('Form submitted');
        // })
    }
    
    return (
        <div className="form">
            <h2>Life Claim Information Request</h2>
            <form onSubmit={handleSubmit}>
                <label>Claim Number</label>
                <input 
                    type="number"
                    required
                    placeholder="Claim Number"
                    value={claimNum}
                    onChange={(e) => setClaimNum(e.target.value)} 
                />
                <br /><br />

                {/* Claim Checklist */}

                <h3>Deceased Information</h3>
                {/* Should there be escape characters for parantheses? */}
                <label>Name of deceased (first, middle, last):</label>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <br /><br />

                <label>Date of birth:</label>
                <input type="date" value={doB} onChange={(e) => setDOB(e.target.value)}/>
                <br /><br />

                <label>Date of death:</label>
                <input type="date" value={doD} onChange={(e) => setDOD(e.target.value)}/>
                <br /><br />

                <h3>Medical Information</h3>
                <label>Cause of death:</label>
                <input type="text" value={deathCause} onChange={(e) => setDeathCase(e.target.value)}/>
                <br /><br />

                {/* Radio buttons do not work */}
                <p>Was deceased hospitalized?</p>
                <input type="radio" id="hospitalized" value={wasHospitalized} onChange={(e) => setWasHospitalized(e.target.value)}/>
                <label htmlFor="hospitalized">Yes</label>
                <input type="radio" id="hospitalized" value={wasHospitalized} onChange={(e) => setWasHospitalized(e.target.value)}/>
                <label htmlFor="hospitalized">No</label>
                <label>If yes, date admitted:</label>
                <input type="date" value={hospitalizationDate} onChange={(e) => setHospitalizationDate(e.target.value)}/>
                <br /><br />

                <label>Name of hospital</label>
                <input type="text" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)}/>
                <br /><br />
                
                {/* Put into div? */}
                <label>Address (street, city, province, postal code)</label>
                <input type="text" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)}/>
                <br /><br />

                <label>Name of attending physician at time of death</label>
                <input type="text" value={attendingPhysicianName} onChange={(e) => setAttendingPhysicianName(e.target.value)}/>
                <br /><br />

                <label>Address (street, city, province, postal code) (Attending physician)</label>
                <input type="text" value={attendingPhysicianAddress} onChange={(e) => setAttendingPhysicianAddress(e.target.value)}/>
                <br /><br />

                <label>Telephone Number (Attending physician) </label>
                <input type="text" value={attendingPhysicianPhone} onChange={(e) => setAttendingPhysicianPhone(e.target.value)}/>
                <br /><br />

                <label>Name of family physican</label>
                <input type="text" value={familyPhysicianName} onChange={(e) => setFamilyPhysicianName(e.target.value)}/>
                <br /><br />

                <label>Address (street, city, province, postal code) (Family physician)</label>
                <input type="text" value={familyPhysicianAddress} onChange={(e) => setFamilyPhysicianAddress(e.target.value)}/>
                <br /><br />

                <label>Telephone Number (Family physician)</label>
                <input type="text" value={familyPhysicianPhone} onChange={(e) => setFamilyPhysicianPhone(e.target.value)}/>
                <br /><br />

                {/* TODO: should be able to add more physcians */}
                <h6>List the name and address of all physicians who treated the insured in the last 2 years</h6>
                <h3>Employment Information</h3>

                <label>Occupation</label>
                <input type="text" value={occupation} onChange={(e) => setOccupation(e.target.value)}/>
                <br /><br />

                <label>Date last worked</label>
                <input type="date" value={dateLastWorked} onChange={(e) => setDateLastWorked(e.target.value)}/>
                <br /><br />

                <label>Employer</label>
                <input type="text" value={employer} onChange={(e) => setEmployer(e.target.value)}/>
                <br /><br />

                <label>Address (street, city, province, postal code) (Employer)</label>
                <input type="text" value={employerAddress} onChange={(e) => setEmployerAddress(e.target.value)}/>
                <br /><br />

                <label>Telephone Number (Employer)</label>
                <input type="text" value={employerPhone} onChange={(e) => setEmployerPhone(e.target.value)}/>
                <br /><br />

                {/* Radio buttons do not work */}
                <p>Reason insured stopped working</p>
                <input type="radio"/>
                <label>Normal retirement</label>
                <input type="radio"/>
                <label>Disability retirement</label>
                <input type="radio"/>
                <label>Illness</label>
                <input type="radio"/>
                <label>Death</label>
                <label>Other (please specify)</label>
                <input type="text"/>
                <br /><br />
                
                
                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;