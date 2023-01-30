import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewMovieAction } from "../../../redux/actions/AdminAction";
import { ENV } from "../../../util/settings/config";

const AddNewFilm = () => {
  const [state, setState] = useState(null);

  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState(e.target.files[0]);
    let file = e.target.files[0];
    if (
      file.type === "image/png" ||
      "image/jpg" ||
      "image/jpeg" ||
      "image/gif"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
  };

  const handleSubmit = (fieldValue) => {
    const value = {
      ...fieldValue,
      ngayKhoiChieu: fieldValue["ngayKhoiChieu"].format("DD/MM/YYYY"),
      hinhAnh: state,
      maNhom: ENV.REACT_APP_GROUP_CODE,
    };

    const formData = new FormData();
    for (let key in value) {
      formData.append(key, value[key]);
      console.log(`${key}`, formData.get(key));
    }
    dispatch(postNewMovieAction(formData));
  };
  return (
    <Fragment>
      <Form
        initialValues={{
          dangChieu: false,
          sapChieu: false,
          hot: false,
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên Phim" name="tenPhim">
          <Input />
        </Form.Item>
        <Form.Item label="Trailer" name="trailer" s>
          <Input name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả" name="moTa">
          <Input name="moTa" />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu" name="ngayKhoiChieu">
          <DatePicker format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item label="Đang chiếu" name="dangChieu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Sắp chiếu" name="sapChieu" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Hot" name="hot" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Rating" name="danhGia">
          <InputNumber max={10} min={0} />
        </Form.Item>
        <Form.Item label="Hình ảnh" name="hinhAnh">
          <input
            onChange={handleChange}
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
          {state && (
            <img
              className="mt-5"
              src={imgSrc}
              alt="..."
              style={{ width: "200px" }}
            />
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default AddNewFilm;
