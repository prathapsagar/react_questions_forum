import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Navbar, Nav, Container } from "react-bootstrap";


function Login() {
  
 
 let [password, setPassword] = useState("");
 let [email, setEmail] = useState("");
  let navigate = useNavigate();
 useEffect(() => {}, []);

 let handleSubmit = async () => {
   let reqBody = {
  
     password,
     email,
   };
   let res = await axios.post(`${url}/login`, reqBody);
   if (res.data.statusCode === 200) {
     navigate("/questions");
   } else {
     console.log(res.data.message);
   }
 };
  let signup = () => {
    sessionStorage.clear();
    navigate("/");
  };

 return (
   <>
     <Navbar bg="dark" variant="dark">
       <Container>
         <div style={{ float: "left" }}>
           <Navbar.Brand href="#home">Questions Answer Forum</Navbar.Brand>
         </div>
         <div>
           <Nav className="me-auto">
             <Nav.Link href="#">
               {" "}
               <button
                 style={{ backgroundColor: "white" }}
                 onClick={() => signup()}
               >
                 SignUp
               </button>
             </Nav.Link>
           </Nav>
         </div>
       </Container>
     </Navbar>
     <div style={{ paddingTop: "5px", marginLeft: "30%", marginRight: "30%" }}>
       <h2 style={{ textAlign: "center", paddingTop: "5px" }}>Login</h2>
       <Form>
         <Form.Group className="mb-3">
           <Form.Label>Email</Form.Label>
           <Form.Control
             type="text"
             placeholder="Enter Email"
             onChange={(e) => setEmail(e.target.value)}
           />
         </Form.Group>

         <Form.Group className="mb-3">
           <Form.Label>Password</Form.Label>
           <Form.Control
             type="password"
             placeholder="Enter Password"
             onChange={(e) => setPassword(e.target.value)}
           />
         </Form.Group>

         <Button variant="primary" onClick={() => handleSubmit()}>
           Submit
         </Button>
       </Form>
     </div>
   </>
 );
}

export default Login;
