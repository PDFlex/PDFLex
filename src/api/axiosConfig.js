import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/form-info/',
    // baseURL: 'https://pdflex-backend.duckdns.org',
    // http://localhost:8080/form-info/
});
