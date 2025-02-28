import React from "react"; 
import { useState } from 'react';

export default function SignUpForm({setToken}) {
    
   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [error, setError] = useState(null)
     
    async function handleSubmit(e) {
        e.preventDefault()

           // Validate inputs 
        if (!username.trim() || !password.trim()) {
        setError("Username and password are required.");
        setToken(null); // Clear the token in the parent component
        return;
        }
 
        // console.log("Hello 👋");
        // console.log(e.target);

        // if (username === "" || password === "") {
        //     setError("Please fill in all fields")
        
        // } else {
        //     setError(null)
        //     console.log("Username:", username, "Password:", password)
        // }

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Please try again")
            }
            
            const result = await response.json()
            console.log("Response data:", result)
            setError(null)
            setToken(result.token) // Set the token in the parent component
            // Reset form after submission
            setUsername("");
            setPassword("");  
            console.log("User signed up successfully")                   

            } catch (error) {
            setError(`An error occurred while signing up ${error.message}`)
            }
    }

     return (
         
         <div>      
            <h2>Welcome to the Sign Up Page</h2>
            
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
            
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                

                <label htmlFor="password">Password: </label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                

                <button type="submit">Sign Up</button>
               

            </form>
         
         </div>
         
        );
 }
 