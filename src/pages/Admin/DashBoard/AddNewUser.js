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
          label={<span className="font-semibold">Tên người dùng</span>}
        >
          <Input />
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
            Thêm người dùng
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default AddNewUser;
