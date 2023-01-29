import { Button } from "antd";
import _ from "lodash";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { ENV } from "../../../../util/settings/config";

export default function Header() {
  const { profile } = useSelector((state) => state.user);

  const renderLogin = () => {
    if (_.isEmpty(profile)) {
      return (
        <Fragment>
          <NavLink to="/login">
            <p className="text-white px-2 no-underline ">Đăng nhập</p>
          </NavLink>
          |
          <NavLink to="/register">
            <p className="text-white px-2 no-underline ">Đăng kí</p>
          </NavLink>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <NavLink className="no-underline" to="/profile">
          <p
            style={{
              color: "white",
            }}
            className="text-white no-underline hover:text-blue-400 mr-2"
          >
            Hello, {profile.taiKhoan}
          </p>
        </NavLink>
        {profile.maLoaiNguoiDung === "QuanTri" ? (
          <NavLink to="/admin">
            {" "}
            <Button type="primary" shape="circle">
              <SettingOutlined />
            </Button>
          </NavLink>
        ) : (
          ""
        )}
        <Button
          type="primary"
          danger
          className="ml-2"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem(ENV.USER_PROFILE);
            window.location.reload();
          }}
          shape="circle"
        >
          <LogoutOutlined />
        </Button>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <header className="p-4 dark:bg-gray-800 dark:text-gray-100 bg-opacity-80 bg-black text-white w-95 z-10">
        <div className=" container flex justify-between h-16 mx-auto">
          <NavLink
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              alt="123"
              src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            ></img>
          </NavLink>
          {/* <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to="/home"
                className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent border-violet-400 text-white hover:text-sky-400"
                activeClassName="text-sky-400"
              >
                Link
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to="/contact"
                className="flex items-center px-4 -mb-1 border-transparent border-violet-400 text-white hover:text-sky-400"
                activeClassName="text-sky-400"
              >
                Link
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                style={{
                  textDecoration: "none",
                }}
                to="/news"
                className="flex items-center px-4 -mb-1 border-transparent border-violet-400 text-white hover:text-sky-400"
                activeClassName="text-sky-400"
              >
                Link
              </NavLink>
            </li>
          </ul> */}
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {renderLogin()}
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 dark:text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </Fragment>
  );
}
