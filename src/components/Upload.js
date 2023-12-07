import {UserIdContext} from "../App";
import { useState, useContext } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import styled from 'styled-components';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const Container = styled.div`
    display: flex;
    height: 100vh;
`

const LeftContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const RightContainer = styled.div`
    flex: 1;
    display: flex;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    border-left: solid #56BD66;
`

const UploadForm = styled.form`
    margin: 4rem;
`   

const Heading = styled.h1`
    font-size: 3em;
    color: #0C9644;
`

const Text = styled.p`
    display: block;
    font-size: 1em;
`

const Input = styled.input`
    margin: 2rem 0;
`

const Button = styled.button` 
    display: block;
    background-color: #56BD66;
    margin: 2rem 0;
    padding: 0.5rem 2rem;
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
    const {claimId} = useContext(UserIdContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function onDocumentLoadSuccess({numPages}) {
        setNumPages(numPages);
      }

    function handleSubmit(event) {
        event.preventDefault()
        const url = 'https://pdflex-backend.duckdns.org/pdf';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('claimId', claimId)
        setLoading(true);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            navigate("/Form");
        });

    }

    return (
        <Container>
            <LeftContainer>
                <UploadForm onSubmit={handleSubmit}>
                    <Heading>Upload and Submit</Heading>
                    <Text>Upon submission of the PDF, you will be prompted to review the information provided
                        to ensure that it was processed correctly.
                    </Text>
                    <Input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])}/>
                    {loading ? <Button>Loading...</Button>: <Button>Submit</Button>}
                </UploadForm>

            </LeftContainer>    
            <RightContainer>
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.apply(null, Array(numPages))
                        .map((x, i) => i + 1)
                        .map((page) => {
                            return (
                                <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false}/>
                            )
                    })}
                </Document>
            </RightContainer>
        </Container>
    );
}
 
export default Upload;