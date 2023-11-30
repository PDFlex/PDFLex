import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import ViewClaimsDashboard from "./components/ViewClaimsDashboard";
import SelectFillOrUpload from "./components/SelectFillOrUpload";
import Upload from "./components/Upload";

function App() {

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login/>}></Route>;
                // Create New Route here for each page (Create new Js file in components)
                // Use State sets default value
                <Route path="/ViewClaimsDashboard" element={<ViewClaimsDashboard/>}></Route>;
                <Route path="/SelectFillOrUpload" element={<SelectFillOrUpload/>}></Route>;
                <Route path="/Upload" element={<Upload/>}></Route>;


            </Routes>
        </div>
    );
}

export default App;
