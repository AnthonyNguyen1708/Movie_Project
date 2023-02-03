import { Button, Popover } from "antd";
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
      <header
        className="fixed w-full z-10"
        style={{
          top: 0,
        }}
      >
        <div className="pt-2 bg-opacity-60 bg-black text-white">
          <div className="container flex justify-between h-16 mx-auto">
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
            {/* <div className="items-center flex flex-shrink-0 ">
              {renderLogin()}
            </div> */}

            <div className="items-center flex-shrink-0 hidden lg:flex">
              {renderLogin()}
            </div>
            <div className="lg:hidden mr-5 h-full flex flex-wrap items-center">
              <Popover placement="bottomRight" content={"abc"} trigger="click">
                <Button shape="round">
                  <SettingOutlined />
                </Button>
              </Popover>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
