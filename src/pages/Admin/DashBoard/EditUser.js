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
      maNhom: ENV.REACT_APP_GROUP_CODE,
      maLoaiNguoiDung: user?.maLoaiNguoiDung,
      matKhau: "",
    });
  }, [user]);
  const handleSubmit = (fieldValues) => {
    console.log(fieldValues);
    dispatch(updateUserAction(fieldValues));
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
          label={<span className="font-semibold">Tên người dùng</span>}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Họ & tên</span>}
          name="hoTen"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Email</span>}
          name="email"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Số điện thoại</span>}
          name="soDT"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold">Mã nhóm</span>}
          name="maNhom"
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
        >
          <Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default EditUser;
