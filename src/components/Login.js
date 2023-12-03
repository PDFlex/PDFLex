import {createContext, useContext, useState} from "react";
import styled from 'styled-components';
import securianLogo from '../images/securian-logo.png';
import backgroundImage from '../images/login-background.jpg';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {UserIdContext} from "../App";
//Allows us to redirect to other pages in the future

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
`

const LoginContainer = styled.div`
    position: relative;
    width: 40%;
    height: 60%;
    margin: auto;
    box-shadow: 0 0 2rem 0.5rem black;
    border-radius: 1rem;
    background-color: #fbfaf2;
`

const Logo = styled.img`
    position: absolute;
    top: 5%;
    left: 15%;
    display: block;
    width: 70%;
`

const Text = styled.h3`
    position: absolute;
    top: 30%;
    left: 10%;
    display: block;
    font-size: 2.2rem;
`

const Label = styled.label`
    position: absolute;
    top: 47%;
    left: 10%;
    font-size: 1.1em;
    font-weight: 425;
`

const Input = styled.input`
    position: absolute;
    top: 52%;
    left: 10%;
    display: block;
    width: 80%;
    padding: 0.8rem 1rem;
    margin: 0.5rem 0;
    border: 0.05rem solid #ccc;
    border-radius: 0.5rem;
    box-sizing: border-box;
    &:focus {
        outline: 0.1rem solid #11a346;
    }
    &::-webkit-inner-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    } 
    &::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`

const Message = styled.p`
    position: absolute;
    bottom: 24%;
    left: 10%;
    font-size: 0.9em;
    color: #dc143c;
`

const Button = styled.button`
    position: absolute;
    bottom: 10%;
    right: 10%;
    display: block;
    box-shadow: 0.1rem 0.1rem 0.2rem 0.005rem lightgrey;
    border-radius: 1.5em;
    background-color: #11a346;
    border: none;
    padding: 1% 4%;
    font-size: 1.4em;
    text-align: center;
    text-decoration: none;
    color: white;
    &:hover{
        background-color: #0c7c44;
    }
`

const Login = () => {

    // const [clientId, setClientId] = useState('');
    const {clientId, setClientId} = useContext(UserIdContext)
    const [verificationMsg, setVerificationMsg] = useState('');
    const navigate = useNavigate();

    const verifyClientId = (clientId) => {
        if (clientId.clientId !== '') {
            const url = 'http://localhost:8080/login/' + clientId.clientId;
            axios.get(url).then((res) => {
                if (res.data === false) {
                    setVerificationMsg('User not found.')
                }
                else {
                    navigate('/ViewClaimsDashboard');
                }
            });
        } else {
            setVerificationMsg('Please enter client ID.')
        }
    }

    return (
        <Container>
            <LoginContainer>
                <Logo src={securianLogo} alt="Logo"/>
                <Text>Welcome</Text>
                <Label>Enter Client ID</Label>
                <Input type='number' placeholder='Client ID' value={clientId} onChange={(e) => setClientId(e.target.value)}/>
                <Message>{verificationMsg}</Message>
                <Button onClick={() => verifyClientId({clientId})}>Login</Button>
            </LoginContainer>
        </Container>
    );
}
 
export default Login;
//
// // Create a context to hold the user ID
// const UserIdContext = createContext();
//
// // A component that provides the user ID to its children
// export const UserIdProvider = ({ children }) => {
//     // State to hold the user ID
//     const [userId, setUserId] = useState(null);
//
//     // Function to update the user ID
//     // const updateUserId = clientId => {
//     setUserId(clientId.clientId);
//     // };
//
//     return (
//         // Provide the user ID and update function to children components
//         <UserIdContext.Provider value={{ userId }}>
//             {children}
//         </UserIdContext.Provider>
//     );
// };
// //
// // A component that consumes the user ID
// export const UserProfile = () => {
//     // Consume the user ID from the context
//     const { userId } = useContext(UserIdContext);
//
//     return (
//         <div>
//             <h2>User Profile</h2>
//             {/* Display the user ID */}
//             <p>User ID: {userId}</p>
//         </div>
//     );
// };

// A component that updates the user ID
// export const UpdateUserId = () => {
//     // Consume the update function from the context
//     const { updateUserId } = useContext(UserIdContext);
//
//     // Function to update the user ID with a random value
//     const handleUpdateClick = () => {
//         // Simulate changing the user ID (generating a random number)
//         const newId = Math.floor(Math.random() * 1000);
//         updateUserId(newId);
//     };
//
//     return (
//         <div>
//             <h2>Update User ID</h2>
//             {/* Button to trigger the update function */}
//             <button onClick={handleUpdateClick}>Change User ID</button>
//         </div>
//     );
// };

