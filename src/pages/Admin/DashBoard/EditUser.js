import { Button, Form, Input, InputNumber, Select } from "antd";
import Password from "antd/es/input/Password";
import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../../redux/actions/AdminAction";
import { ENV } from "../../../util/settings/config";

const EditUser = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = props.user;
  useEffect(() => {
    form.setFieldsValue({
      taiKhoan: user?.taiKhoan,
      hoTen: user?.hoTen,
      email: user?.email,
      soDT: user?.soDT,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
      matKhau: "",
    });
  }, [user]);
  const handleSubmit = (fieldValues) => {
    const dataEdit = { ...fieldValues, maNhom: ENV.REACT_APP_GROUP_CODE };
    console.log("dataEdit: ", dataEdit);

    dispatch(updateUserAction(dataEdit));
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
          label={<span className="font-semibold">Tài khoản</span>}
        >
          <Input disabled />
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
          rules={[
            {
              required: true,
              message: "Mật khẩu không được để trống!",
            },
          ]}
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default EditUser;
