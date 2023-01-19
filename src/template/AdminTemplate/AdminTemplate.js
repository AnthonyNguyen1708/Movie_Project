import React, { Fragment, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import _ from "lodash";
import { useSelector } from "react-redux";
import { history } from "../../App";
import { ENV } from "../../util/settings/config";

const { Header, Content, Footer, Sider } = Layout;

const AdminTemplate = (props) => {
  const { profile } = useSelector((state) => state.user);
  const { Component, ...restProps } = props;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(ENV.USER_PROFILE)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  if (profile.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  const operations = (
    <Fragment>
      {!_.isEmpty(profile) ? (
        <Fragment>
          {" "}
          <Button
            onClick={() => {
              history.push("/profile");
            }}
          >
            {" "}
            Hello ! {profile.taiKhoan}
          </Button>{" "}
          <Button
            onClick={() => {
              localStorage.removeItem(ENV.USER_PROFILE);
              localStorage.removeItem("accessToken");
              history.push("/home");
              window.location.reload();
            }}
            className="text-blue-800"
          >
            Đăng xuất
          </Button>{" "}
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout
              style={{
                minHeight: "100vh",
              }}
            >
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <div className="logo p-5">
                  <NavLink to="/">
                    <img
                      width={150}
                      src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
                      alt="..."
                    />
                  </NavLink>
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Users</NavLink>
                  </Menu.Item>
                  <SubMenu key="2" icon={<FileOutlined />} title="Films">
                    <Menu.Item key="3" icon={<FileOutlined />}>
                      <NavLink to="/admin/films">Films</NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileOutlined />}>
                      <NavLink to="/admin/films/addNew">Add new</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="5" icon={<DesktopOutlined />}>
                    <NavLink to="/admin/showtimes">Showtime</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                  }}
                >
                  <div className="text-right pr-10 pt-1">{operations}</div>
                </Header>

                <Content
                  style={{
                    margin: "0 10px",
                  }}
                >
                  <Breadcrumb
                    style={{
                      margin: "10px 0",
                    }}
                  ></Breadcrumb>
                  <div
                    style={{
                      padding: 24,
                      minHeight: "85vh",
                      background: colorBgContainer,
                    }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  Ant Design ©2023 Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
