import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Checklist from "./Pages/Checklist";
import ChecklistDetail from "./Pages/ChecklistDetail";
import Item from "./Pages/Item";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Register></Register>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/checklist">
          <Checklist></Checklist>
        </Route>
        <Route path="/checklist-detail">
          <ChecklistDetail></ChecklistDetail>
        </Route>
        <Route path="/item">
          <Item></Item>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
