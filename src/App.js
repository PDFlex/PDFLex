import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Upload from "./components/Upload";

function App() {


    const [information, setInformation] = useState();
    const getInformation = async () => {

        try
        {
            const response = await api.get("/information");
            setInformation(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        getInformation().then(r => {});
    }, [])

    return (
    <div className="App">
            <Header/>
            <Routes>
                <Route exact path="/" element={<Layout/>}>
                    <Route path="/" element={<Home information = {information}/>} ></Route>
                    <Route path="/Information/:firstName" element={<Home GetInformationData={information}/>}></Route>;
                </Route>
                <Route path="/components/Upload" element={<Upload/>}></Route>
                {/* <Route path="/components/Login" element={<Login/>}></Route>
                <Route path="/components/Form" element={<Form/>}></Route> */}

            </Routes>
        </div>
    );
}

export default App;
