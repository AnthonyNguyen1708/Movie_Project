import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";

import { useFormik } from "formik";
import moment from "moment";
import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieInfoAction,
  postNewMovieAction,
} from "../../../redux/actions/AdminAction";
import { ENV } from "../../../util/settings/config";

const Edit = (props) => {
  let { id } = props.match.params;

  const { movieInfo } = useSelector((state) => state.admin);

  const [imgSrc, setImgSrc] = useState(null);

  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tenPhim: movieInfo?.tenPhim,
      trailer: movieInfo?.trailer,
      moTa: movieInfo?.moTa,
      maNhom: ENV.REACT_APP_GROUP_CODE,
      ngayKhoiChieu: movieInfo?.ngayKhoiChieu,
      sapChieu: movieInfo?.sapChieu,
      dangChieu: movieInfo?.dangChieu,
      hot: movieInfo?.hot,
      danhGia: movieInfo?.danhGia,
      hinhAnh: null,
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
    let ngayKhoiChieu = moment(value?.$d);
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

  useEffect(() => {
    dispatch(getMovieInfoAction(id));
  }, []);

  return (
    <Fragment>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        <Form.Item label="Tên Phim">
          <Input
            name="tenPhim"
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            value={formik.values.trailer}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            value={formik.values.moTa}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            format={"DD/MM/YYYY"}
            name="ngayKhoiChieu"
            value={moment(formik.values.ngayKhoiChieu)}
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            checked={formik.values.dangChieu}
            onChange={handleChangeSwitch("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            checked={formik.values.sapChieu}
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            checked={formik.values.hot}
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>
        <Form.Item label="Rating">
          <InputNumber
            value={formik.values.danhGia}
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
          {!imgSrc ? (
            <img
              className="mt-5"
              src={movieInfo.hinhAnh}
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
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Edit;
