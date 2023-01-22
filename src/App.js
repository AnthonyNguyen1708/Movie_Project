import { createBrowserHistory } from "history";
import React from "react";
import { Router, Switch } from "react-router-dom";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import { HomeTemplate } from "./template/HomeTemplate/HomeTemplate";
import Detail from "./pages/Detail/Detail";
import CheckOutTemplate from "./template/CheckOutTemplate/CheckOutTemplate";
import CheckOut from "./pages/CheckOut/CheckOut";
import { UserTemplate } from "./template/UserTemplate/UserTemplate";
import Spinning from "./components/Loading/Spinning";
import AdminTemplate from "./template/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/DashBoard/DashBoard";
import Films from "./pages/Admin/Films/Films";
import AddNewFilm from "./pages/Admin/Films/AddNewFilm";
import Edit from "./pages/Admin/Films/Edit";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Spinning />
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />
        <HomeTemplate path="/profile" exact Component={Profile} />

        <CheckOutTemplate path="/checkout/:id/" exact Component={CheckOut} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate
          path="/admin/films/addNew"
          exact
          Component={AddNewFilm}
        />
        <AdminTemplate
          path="/admin/films/showTime/:id/:tenphim"
          exact
          Component={ShowTime}
        />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />

        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
