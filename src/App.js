import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Question from "./components/Question";
export const url = "https://express-stack-clone.herokuapp.com/users/";
export const FoodContext = React.createContext();

function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
