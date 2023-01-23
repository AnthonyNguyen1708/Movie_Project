import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { postUserLogin } from "../../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const Login = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  console.log("user: ", user);

  const handleLogin = (values) => {
    console.log("Success:", values);
    dispatch(postUserLogin(values));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="container mx-auto text-center">
      <h1>Login</h1>
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
                message: "Please input your username!",
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
                message: "Please input your password!",
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
          <p>
            123abc <br />
            123abc
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
