import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { ENV } from "../../../../util/settings/config";

const PopupHeader = () => {
  const { profile } = useSelector((state) => state.user);
  return (
    <div>
      {profile ? (
        <div>
          <div>
            <span>Hello, </span>
            <NavLink className="no-underline" to="/profile">
              <span className="text-sky-600 font-semibold no-underline hover:text-blue-400 mr-2">
                {profile.taiKhoan}
              </span>
            </NavLink>
          </div>
          <div className="my-2">
            {profile.maLoaiNguoiDung === "QuanTri" ? (
              <div>
                <Button type="primary" size="small" shape="circle">
                  <SettingOutlined />
                </Button>
                <NavLink
                  className="ml-2 text-sky-600 font-semibold"
                  to="/admin"
                >
                  Trang Admin
                </NavLink>
              </div>
            ) : (
              ""
            )}
          </div>

          <div>
            <Button
              type="primary"
              size="small"
              danger
              className=""
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem(ENV.USER_PROFILE);
                window.location.reload();
              }}
              shape="circle"
            >
              <LogoutOutlined />
            </Button>
            <span className="ml-2 text-red-500 font-semibold">Đăng xuất</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PopupHeader;
