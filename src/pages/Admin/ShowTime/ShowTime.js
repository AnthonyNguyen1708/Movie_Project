import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import React, { useState, useEffect } from "react";
import { adminService } from "../../../service/AdminService";

const ShowTime = (props) => {
  const { id, tenphim } = props.match.params;
  const [state, setState] = useState({
    cinemaSystem: [],
    cinemaList: [],
  });

  const handleSubmit = async (fieldValue) => {
    const value = {
      ...fieldValue,
      ngayChieuGioChieu: fieldValue["ngayChieuGioChieu"].format(
        "DD/MM/YYYY hh:mm:ss"
      ),
      maPhim: id,
    };
    try {
      const res = await adminService.postShowTime(value);
      alert(`${res.data.content}`);
    } catch (error) {
      alert(`${error.response.data.content}`);
    }
  };

  const mapOptionSelect = () => {
    return state.cinemaSystem?.map((item, index) => {
      return { label: item.tenHeThongRap, value: item.maHeThongRap };
    });
  };

  const handleChangeCinemaList = async (value) => {
    try {
      let res = await adminService.getCinemaListInfo(value);

      setState({
        ...state,
        cinemaList: res.data.content,
      });
    } catch (error) {}
  };

  const getCinemaSystemAction = async () => {
    try {
      let res = await adminService.getCinemaSystemInfo();

      setState({
        ...state,
        cinemaSystem: res.data.content,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getCinemaSystemAction();
  }, []);

  return (
    <div className="container mx-auto">
      <h3 className="text-center">{`Tạo lịch chiếu phim: ${tenphim}`}</h3>
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        initialValues={{ remmber: true }}
      >
        <Form.Item label="Hệ thống rạp">
          <Select
            options={mapOptionSelect()}
            onChange={handleChangeCinemaList}
            style={{
              width: "60%",
            }}
          ></Select>
        </Form.Item>

        <Form.Item name={`maRap`} label="Cụm rạp">
          <Select
            options={state.cinemaList?.map((item, index) => ({
              label: item.tenCumRap,
              value: item.maCumRap,
            }))}
            style={{
              width: "60%",
            }}
          ></Select>
        </Form.Item>

        <Form.Item name={`ngayChieuGioChieu`} label=" Ngày chiếu giờ chiếu">
          <DatePicker
            format={"DD/MM/YYYY hh:mm:ss"}
            style={{
              width: "30%",
            }}
            showTime
          ></DatePicker>
        </Form.Item>

        <Form.Item name={`giaVe`} label="Giá vé">
          <InputNumber
            style={{
              width: "20%",
            }}
            min={75000}
            max={150000}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowTime;
