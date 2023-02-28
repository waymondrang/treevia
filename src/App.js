import { Link } from "react-router-dom";
import "./App.css";
import React from 'react';
import { Outlet } from "react-router-dom";
import MainPage from './routes/MainPage.js';
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";

function App() {
  
  return (
    <Outlet />
  );
}

export default App;
