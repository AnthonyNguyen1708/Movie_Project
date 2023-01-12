import { createBrowserHistory } from "history";
import React from "react";
import { Router, Switch } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { HomeTemplate } from "./template/HomeTemplate/HomeTemplate";
import Detail from "./pages/Detail/Detail";
import CheckOutTemplate from "./template/CheckOutTemplate/CheckOutTemplate";
import CheckOut from "./pages/CheckOut/CheckOut";
import { UserTemplate } from "./template/UserTemplate/UserTemplate";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <CheckOutTemplate path="/checkout/:id" exact Component={CheckOut} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
