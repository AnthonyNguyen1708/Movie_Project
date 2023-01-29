import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import moment from "moment/moment";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieInfoAction,
  postUpdateMovieAction,
} from "../../../redux/actions/AdminAction";
import dayjs from "dayjs";
import { ENV } from "../../../util/settings/config";

const Edit = (props) => {
  const { id } = props.match.params;

  const [form] = Form.useForm();

  const { movieInfo } = useSelector((state) => state.admin);

  const [state, setState] = useState(movieInfo?.hinhAnh);

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
    console.log(value);
    const formData = new FormData();
    for (var key in value) {
      formData.append(key, value[key]);
      console.log(`${key}`, formData.get(key));
    }
    dispatch(postUpdateMovieAction(formData));
  };

  form.setFieldsValue({
    tenPhim: movieInfo?.tenPhim,
    trailer: movieInfo?.trailer,
    moTa: movieInfo?.moTa,
    ngayKhoiChieu: dayjs(movieInfo?.ngayKhoiChieu),
    dangChieu: movieInfo?.dangChieu,
    sapChieu: movieInfo?.sapChieu,
    hot: movieInfo?.hot,
    danhGia: movieInfo?.danhGia,
  });

  useEffect(() => {
    dispatch(getMovieInfoAction(id));
  }, []);

  return (
    <Fragment>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Form.Item label="Tên Phim" name="tenPhim">
          <Input />
        </Form.Item>
        <Form.Item label="Trailer" name="trailer">
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
          {!imgSrc ? (
            <img
              className="mt-5"
              src={movieInfo?.hinhAnh}
              alt="..."
              style={{ width: "200px" }}
            />
          ) : (
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

export default Edit;
