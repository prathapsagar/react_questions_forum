import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Register() {
  
 
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let navigate = useNavigate();
useEffect(() => {

}, []);
 
  let handleSubmit = async () => {
    let reqBody = {
     name,
     password,
     email
    };
    let res = await axios.post(`${url}/signup`, reqBody);
    if (res.data.statusCode === 200) {
      navigate("/Login");
    } else {
      console.log(res.data.message);
    }
  };
    let login = () => {
      sessionStorage.clear();
      navigate("/login");
    };


  return (<>
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
                  onClick={() => login()}
                >
                  Login
                </button>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
  
    <div style={{ paddingTop: "5px", marginLeft: "30%", marginRight: "30%" }}>

      <h2 style={{ textAlign: "center", paddingTop: "5px" }}>Sign Up</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
            type="text"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div style={{ textAlign: "center", paddingTop: "5px" }}>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
<br></br>
          <Link to="/Login">
            <br></br>
            <Button variant="primary">Login?</Button>
          </Link>
        </div>
      </Form>
    </div>
    </>
  );
}

export default Register;
