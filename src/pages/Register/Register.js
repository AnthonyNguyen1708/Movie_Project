import { Button, Form, Input } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUserRegisterAction } from "../../redux/actions/UserAction";

const Register = (props) => {
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    postUserRegisterAction(value);
  };
  return (
    <div className="container mx-auto">
      <div className="text-center p-5">
        <h1 className="tracking-wide mb-10">TẠO TÀI KHOẢN</h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
        >
          <Form.Item name={`taiKhoan`} wrapperCol={{ span: 8, offset: 8 }}>
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item name={`email`} wrapperCol={{ span: 8, offset: 8 }}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name={`hoTen`} wrapperCol={{ span: 8, offset: 8 }}>
            <Input placeholder="Họ & tên" />
          </Form.Item>

          <Form.Item name={`soDt`} wrapperCol={{ span: 8, offset: 8 }}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item name={`matKhau`} wrapperCol={{ span: 8, offset: 8 }}>
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
            <Button
              htmlType="submit"
              style={{
                width: "50%",
              }}
              type="primary"
            >
              Đăng kí
            </Button>
          </Form.Item>

          <p>
            Bạn đã có tài khoản? |{" "}
            <span>
              <NavLink to="/login">Đăng nhập ngay!</NavLink>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
