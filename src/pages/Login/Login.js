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
          layout="vertical"
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Submit
            </Button>

            <p>
              Haven't have an account yet? |{" "}
              <span>
                <NavLink to="/register">Register now</NavLink>
              </span>
            </p>
            <p>
              abcdef5297 <br />
              123456gs
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
