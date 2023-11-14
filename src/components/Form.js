import { useState } from "react";

const Form = () => {
    const [name, setName] = useState('');
    const [doB, setDOB] = useState(new Date());
    const [doD, setDOD] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {name, doB, doD};
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
                <h3>Deceased Information</h3>
                {/* Should there be escape characters for parantheses? */}
                <label>Name of deceased (first, middle, last):</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                <br /><br />

                <label>Date of birth:</label>
                <input type="date" required value={doB} onChange={(e) => setDOB(e.target.value)}/>

                <br /><br />

                <label>Date of death:</label>
                <input type="date" required value={doD} onChange={(e) => setDOD(e.target.value)}/>

                <br /><br />
                
                <button>Submit</button>
            </form>
        </div>
    );
}
 
export default Form;