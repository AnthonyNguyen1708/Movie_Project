import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";

import { useFormik } from "formik";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewMovieAction } from "../../../redux/actions/AdminAction";
import { ENV } from "../../../util/settings/config";

const AddNewFilm = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: ENV.REACT_APP_GROUP_CODE,
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      dispatch(postNewMovieAction(formData));
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value?.$d).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
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
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <Fragment>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Tên Phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker name="ngayKhoiChieu" onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            max={10}
            min={0}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            name="hinhAnh"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
          {imgSrc && (
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
