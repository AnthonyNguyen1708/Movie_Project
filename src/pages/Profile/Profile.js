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
    <div
      style={{
        minHeight: "900px",
      }}
      className="container mx-auto"
    >
      <div className="flex justify-evenly sm:block">
        <div className="w-1/3 flex justify-center sm:w-full">
          <div className="text-center mt-10">
            <img
              width={300}
              height={450}
              src="https://picsum.photos/3000"
              alt=""
            />
            <h3>{profile.hoTen}</h3>
            <p>Ngày tháng năm sinh</p>
            <p>SĐT: {profile.soDT}</p>
            <p>Email: {profile.email}</p>
          </div>
        </div>
        <div className="text-center w-1/2 sm:w-full">
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
