import { Button, Form, Input, InputNumber, message, Select } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUserRegisterAction } from "../../redux/actions/UserAction";
import { Option } from "antd/es/mentions";

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
          <Form.Item
            name={`taiKhoan`}
            rules={[
              {
                required: true,
                message: "Tài khoản không được để trống!",
              },
              {
                pattern: /^[a-z0-9]{4,}$/,
                message: "Tài khoản phải từ 4 kí tự bao gồm chữ hoặc số",
              },
            ]}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Input placeholder="Tài khoản" />
          </Form.Item>

          <Form.Item
            name={`email`}
            rules={[
              {
                type: "email",
                message: "E-mail không hợp lệ!",
              },
              {
                required: true,
                message: "E-mail không được để trống!!",
              },
            ]}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name={`hoTen`}
            rules={[
              {
                required: true,
                message: "Họ và tên không dược để trống!",
              },
              {
                pattern: /^([^0-9]*)$/,
                message: "Họ và tên không được bao gồm số!",
              },
            ]}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Input placeholder="Họ & tên" />
          </Form.Item>

          <Form.Item
            name={`soDt`}
            rules={[
              {
                required: true,
                message: "Số điện thoại không được để trống!!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Số điện thoại không hợp lệ!!",
              },
            ]}
            wrapperCol={{ span: 8, offset: 8 }}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name={`matKhau`}
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống!",
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
                message:
                  "Mật khẩu phải từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)!",
              },
            ]}
            wrapperCol={{ span: 8, offset: 8 }}
          >
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
