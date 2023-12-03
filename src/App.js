import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import ViewClaimsDashboard from "./components/ViewClaimsDashboard";
import SelectFillOrUpload from "./components/SelectFillOrUpload";
import Upload from "./components/Upload";
import Form from "./components/Form";
import FormSubmittedView from "./components/FormSubmittedView";
import ViewFormsDashboard from "./components/ViewFormsDashboard";
import {createContext, useContext, useState} from "react";


// Create a context to hold the user ID
export const UserIdContext = createContext({
    clientId: "",
    setClientId:() => {}
});


function App() {
    const [clientId, setClientId] = useState('');


    return (
        <div className="App">
            <UserIdContext.Provider value={{clientId: clientId, setClientId: setClientId}}>

            <Routes>
                <Route path="/" element={<Login/>}></Route>;
                // Create New Route here for each page (Create new Js file in components)
                // Use State sets default value
                <Route path="/ViewClaimsDashboard" element={<ViewClaimsDashboard/>}></Route>;
                <Route path="/SelectFillOrUpload" element={<SelectFillOrUpload/>}></Route>;
                <Route path="/Upload" element={<Upload/>}></Route>;
                <Route path="/Form" element={<Form/>}></Route>;
                <Route path="/FormSubmittedView" element={<FormSubmittedView/>}></Route>;
                <Route path="/ViewFormsDashboard" element={<ViewFormsDashboard/>}></Route>;

            </Routes>
            </UserIdContext.Provider>
        </div>
    );
}

export default App;
