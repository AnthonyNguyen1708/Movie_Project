import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Input, Popover } from "antd";
import { postUserLogin } from "../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const admin = (
  <div>
    <p>Id: anthony1412</p>
    <p>Pass: 123456</p>
  </div>
);
const client = (
  <div>
    <p>Id: anthony1708</p>
    <p>Pass: 123456</p>
  </div>
);
const Login = (props) => {
  const dispatch = useDispatch();
  const handleLogin = (values) => {
    console.log("Success:", values);
    dispatch(postUserLogin(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="mt-20">Login</h1>
      <div className="flex justify-center pt-5">
        <Form
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Hãy nhập tài khoản!",
              },
            ]}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Hãy nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>

          <p>
            Bạn chưa có tài khoản? |{" "}
            <span>
              <NavLink to="/register">Đăng kí ngay!</NavLink>
            </span>
          </p>

          <Popover content={client} title="Client">
            <Button className="bg-teal-500 text-white " size="medium">
              Khách hàng
            </Button>
          </Popover>
          <Popover content={admin} title="Admin">
            <Button className="bg-cyan-500 text-white" size="medium">
              Quản trị
            </Button>
          </Popover>
        </Form>
      </div>
    </div>
  );
};

export default Login;
