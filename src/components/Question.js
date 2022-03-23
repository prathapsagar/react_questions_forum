import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import axios from "axios";
import { url } from "../App";

import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Navbar, Nav, Container } from "react-bootstrap";




function Question() {
    let navigate = useNavigate();
  let [data, setData] = useState([])
  let [Questions, setQuestion] = useState("");
  let [answer, setAnswer] = useState("")
  let [answers, setAnswers] = useState([]);
  var value = []


  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {

    try {
      let res = await axios.get(`${url}/all`);
      if (res.data.statusCode === 200) {
        if (res.data.users.length > 0) {
          for (let i in res.data.users) {
            value.push(res.data.users[i]);
          }
          ;

          setData(value)



        }
      }


    } catch (error) {
      console.log(error);

    }

  };



  let handleSubmit = async () => {

    setAnswers([])
    console.log(answers)


    let reqBody = {
      question: Questions,
      answers,
    };
    console.log("hello");
    console.log(reqBody);
    let res = await axios.post(`${url}/questions`, reqBody);
    if (res.data.statusCode >= 200) {
      console.log("new")
      getData();
      document.getElementById("new_form").reset();
    } else {
      console.log(res.data.message);
    }


  };


  let handleChange = async (value, id) => {
    let new_arr = []
    for (let obj of data) {
      if (obj._id === id) {
        new_arr.push(obj.answers)
      }
    }
    new_arr[0].push(answer)
    console.log(new_arr);
    setAnswers(new_arr[0])
    let question = value;
    let reqBody = {
      question,
      answers
    };
    console.log("hello")
    console.log(reqBody)

    let res = await axios.put(`${url}/add_answer`, reqBody);
    if (res.data.statusCode === 200) {
      getData();
    } else {
      console.log(res.data.message);
    }
  };

    let logout = () => {
    sessionStorage.clear();
    navigate("/login");
  };


  return (
    <div>
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
                  onClick={() => logout()}
                >
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div style={{ border: " 2px solid black", padding: " 5px" }}>
        <h3>Post A question</h3>
        <Form id="new_form">
          <Form.Group className="mb-3">
            <Form.Label>Post Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your question"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Form>
      </div>
      <div>
        {data.map((e, i) => {
          return (
            <>
              <div style={{ border: " 2px solid black" }} key={i}>
                <div
                  style={{
                    "font-weight": "bold",
                    color: "red",
                    "font-size": "25px",
                    border: " 2px solid #969696",
                  }}
                >
                  {e.question}
                </div>
                <div>
                  <h4>Anwers:</h4>
                  {e.answers.map((k, j) => {
                    return (
                      <>
                        <ul key={j}>
                          <li style={{ "font-weight": "bold" }}>{k}</li>
                        </ul>
                      </>
                    );
                  })}
                </div>
                <div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Post answers</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your answer"
                        onChange={(e) => {
                          setAnswer(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={() => handleChange(e.question, e._id)}
                    >
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Question;
