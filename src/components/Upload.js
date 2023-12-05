import {ClaimContext} from "../App";
import { useState, useContext } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import resume from './resume.pdf';
import styled from 'styled-components';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
`

const GridContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: solid;
`

const UploadForm = styled.form`
`   

const Heading = styled.h1`
    margin: 2rem;
    font-size: 3em;
    color: #0C9644;
`

const Text = styled.p`
    margin: 2rem;
    font-size: 1.3em;
    margin: 0 0 6rem;
`

const Input = styled.input`
    margin: 2rem;
`

const Button = styled.button` 
    display: block;
    background-color: #56BD66;
    margin: 2rem;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 0.3em;
    border: none;
    font-size: 1.5em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #4daa5b;
    }
`

const Upload = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const {claimId} = useContext(ClaimContext);
    const navigate = useNavigate();

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
      }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'http://localhost:8080/pdf';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('claimId', claimId)

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
        navigate("/Form");
    }

    return (
        <Container>
            <GridContainer>
                <UploadForm onSubmit={handleSubmit}>
                    <Heading>Upload and Submit</Heading>
                    <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])}/>
                    <Button>Submit</Button>
                </UploadForm>

            </GridContainer>
            <GridContainer>
                <Document file={resume} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} scale={0.7}/>
                </Document>
                <Text>Page {pageNumber} of {numPages}</Text>
            </GridContainer>
        </Container>
    );
}
 
export default Upload;