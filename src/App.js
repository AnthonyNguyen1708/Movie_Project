import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import { HomeTemplate } from "./template/HomeTemplate/HomeTemplate";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/" exact Component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
