import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';

function App() {

    const [information, setInformation] = useState();
    // const [info, setInfo] = useState();
    const getInformation = async () => {

        try
        {
            const response = await api.get("/information");

            // console.log(response.data);

            setInformation(response.data);
        }
        catch(err) {
            console.log(err);
        }
    }

    // const getInformationData = async (firstName) => {
    //     try
    //     {
    //         const response = await api.get("/information/${firstName}");
    //
    //         const singleInfo = response.data;
    //
    //         setInfo(singleInfo);
    //     }
    //     catch (error) {
    //
    //     }
    // }

    useEffect(() => {
        getInformation().then(r => {});
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/" element={<Home information = {information}/>} ></Route>
                    <Route path="/Information/:firstName" element={<Home GetInformationData={information}/>}></Route>;
                </Route>
            </Routes>
        </div>
    );
}

export default App;
