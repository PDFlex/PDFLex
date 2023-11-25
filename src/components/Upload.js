import React from 'react'
import {useState} from "react";
import axios from 'axios';
// Source Code: https://www.filestack.com/fileschool/react/react-file-upload/

const Upload = () => {
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8080/pdf';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const claimId = 1234567;
        formData.append('claimId', claimId)
 
        const config = {
            headers: {
                'content-type': 'multipart/form-data',

            },
        };

        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
    }

    return (
        <div className="upload">
            <form onSubmit={handleSubmit}>
                <h1>Submit Life Claim Form</h1>
                <input type="file" onChange={handleChange}/>
                <button type="submit">Upload</button>
            </form>
        </div>
);
}
export default Upload;