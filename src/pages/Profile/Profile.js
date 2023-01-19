import { Image, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinning from "../../components/Loading/Spinning";
import { bookingHistoryAction } from "../../redux/actions/UserAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { bookingHistory, profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(bookingHistoryAction);
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex justify-evenly">
        <div className="w-1/3 flex justify-center">
          <div className="text-center mt-10">
            <img
              width={300}
              height={450}
              src="https://cdn4.vectorstock.com/i/1000x1000/75/28/young-man-wearing-sleeveless-top-faceless-avata-vector-15127528.jpg"
              alt=""
            />
            <h5>{profile.hoTen}</h5>
            <h4>Thông tin tai khoan</h4>
            <p>Ngày tháng năm sinh</p>
            <p>SĐt: 090121312312</p>
            <p>Email</p>
          </div>
        </div>
        <div className="text-center w-1/2">
          <h2>Lịch sử đặt vé</h2>
          {bookingHistory?.thongTinDatVe ? (
            <Table
              className="mx-auto mt-10"
              style={{
                maxWidth: "1200px",
              }}
              dataSource={bookingHistory?.thongTinDatVe}
            >
              <Column
                title="Movie"
                dataIndex="hinhAnh"
                key="hinhAnh"
                render={(dataIndex) => <Image width={150} src={dataIndex} />}
              />
              <Column
                title="Movie Information"
                key="1"
                render={(item, index) => {
                  return (
                    <div key={index}>
                      <h5 className="text-xl">{item.tenPhim}</h5>
                      <p>Thời lượng: {item.thoiLuongPhim} phút</p>
                      <p>
                        Ngày chiếu: {moment(item.ngayDat).format("DD.MM.YYYY")}
                      </p>
                      <p>Giờ chiếu: {moment(item.ngayDat).format("hh:mm A")}</p>
                    </div>
                  );
                }}
              />
              <Column
                className="w-1/2"
                title="Ticket Information"
                key="2"
                render={(item, index) => {
                  return (
                    <div key={index}>
                      <h5 className="text-base">
                        {" "}
                        Địa chỉ: {item.danhSachGhe[0].tenHeThongRap} -{" "}
                        {item.danhSachGhe[0].tenRap}
                      </h5>
                      <div>
                        Ghế:{" "}
                        <div>
                          {item.danhSachGhe.map((chair, index) => {
                            return (
                              <Tag
                                key={index}
                                style={{
                                  marginBottom: "5px",
                                  width: "38px",
                                  textAlign: "center",
                                }}
                                color="red"
                              >
                                {chair.tenGhe}
                              </Tag>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }}
              />
            </Table>
          ) : (
            <Spinning />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
