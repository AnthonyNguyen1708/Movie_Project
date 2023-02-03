import { Button, Form, Input, Select } from "antd";
import Password from "antd/es/input/Password";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { addNewUserAction } from "../../../redux/actions/AdminAction";
import { ENV } from "../../../util/settings/config";

const AddNewUser = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = (fieldValues) => {
    const dataAdd = { ...fieldValues, maNhom: ENV.REACT_APP_GROUP_CODE };

    dispatch(addNewUserAction(dataAdd));
  };
  return (
    <Fragment>
      <Form
        form={form}
        layout="vertical"
        name="edit-user"
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="taiKhoan"
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
          label={<span className="font-semibold">Tài khoản</span>}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Họ & tên</span>}
          name="hoTen"
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Email</span>}
          name="email"
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
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Số điện thoại</span>}
          name="soDT"
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="font-semibold">Loại người dùng</span>}
          name="maLoaiNguoiDung"
        >
          <Select
            options={[
              {
                value: "KhachHang",
                label: "Khách hàng",
              },
              {
                value: "QuanTri",
                label: "Quản trị",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Mật khẩu</span>}
          name="matKhau"
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
        >
          <Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default AddNewUser;
