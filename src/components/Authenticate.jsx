import React from "react"; 
import { useState } from 'react';

export default function Authenticate({token}) {

    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [userData, setUserData] = useState(null)
    
    async function handleClick(c) {
        c.preventDefault() 

        if (!token) {
            setError("You must sign up first to receive a token.");
            return;
        }

        console.log("Token:", token)

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Please try again")
            }
            const result = await response.json()
            console.log("Response data:", result)
            setError(null)
            setSuccessMessage(`Token authenticated successfully ${result.success}`)
            console.log(`Token authenticated successfully, ${result.success}`) 
            setUserData(result.data);  
        }
        catch (error) {
            setError(`An error occurred while authenticating: ${error.message}`)
        }
    }
    

     return (
         
         <div>     

            <h2>Authenticate</h2>

            <button onClick={handleClick}>Authenticate Token</button>

            {error && <p className="error-message" style={{ color: "blue" }}>{error}</p>}

            {userData && (
                <div>
                    <h3 className="success-message">Welcome, {userData.username}!</h3>  {/* Display username */}
                </div>
            )}

         </div>
         
        );
 }