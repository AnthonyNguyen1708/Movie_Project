import { Button, Tabs, Table, Tag, Image } from "antd";
import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingTicketAction,
  getTheaterDetailAction,
} from "../../redux/actions/MoviesAction";
import {
  ArrowRightOutlined,
  CloseOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import actionsType from "../../redux/actions/types/ActionsType";
import _ from "lodash";
import { BookingInfo } from "../../_core/models/BookingInfo";
import "./CheckOut.css";
import Column from "antd/es/table/Column";
import Spinning from "../../components/Loading/Spinning";
import { bookingHistoryAction } from "../../redux/actions/UserAction";
import moment from "moment";
import { history } from "../../App";
import { ENV } from "../../util/settings/config";

const SeatSelection = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);

  const { theaterDetail, bookingChairList } = useSelector(
    (state) => state.movie
  );
  const { thongTinPhim, danhSachGhe } = theaterDetail;

  useEffect(() => {
    dispatch(getTheaterDetailAction(props.match.params.id));
  }, []);

  const renderSeats = () => {
    return danhSachGhe.map((chair, index) => {
      let classVipChair = chair.loaiGhe === "Vip" ? "gheVip" : "";
      let classBookedChair = chair.daDat === true ? "gheDaDat" : "";
      let classBookingChair = "";
      let indexBookingChair = bookingChairList.findIndex(
        (bookingChair) => bookingChair.maGhe === chair.maGhe
      );

      if (indexBookingChair !== -1) {
        classBookedChair = "gheDangDat";
      }
      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch({
                type: actionsType.SET_BOOKING_CHAIR,
                payload: chair,
              });
            }}
            disabled={chair.daDat}
            className="border-none bg-transparent"
          >
            <i
              class={`fa fa-couch ghe ${classVipChair} ${classBookedChair} ${classBookingChair} $  text-center`}
            ></i>
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-12">
        <div className="col-span-7 mt-20">
          <div className="mt-20">
            <div className="mx-auto">
              <img
                className="w-full"
                src="https://movie-booking-project.vercel.app/img/bookticket/screen.png"
                alt=""
              />
            </div>
            <div className="flex justify-center">
              <div>{renderSeats()}</div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <div className="mx-4">
              Ghế trống <br />
              <div className="flex justify-center">
                <button className="border-none bg-transparent">
                  <i class="fa fa-couch ghe "></i>
                </button>
              </div>
            </div>
            <div className="mx-4">
              Ghế đang chọn <br />
              <div className="flex justify-center">
                <button className="border-none bg-transparent">
                  <i class="fa fa-couch ghe gheDangDat"></i>
                </button>
              </div>
            </div>
            <div className="mx-4">
              Ghế VIP <br />
              <div className="flex justify-center">
                <button className="border-none bg-transparent">
                  <i class="fa fa-couch ghe gheVip"></i>
                </button>
              </div>
            </div>
            <div className="mx-4">
              Ghế đã đặt <br />
              <div className="flex justify-center">
                <button className="border-none bg-transparent">
                  <i class="fa fa-couch ghe gheDaDat"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-start-9 col-span-4">
          <div className="p-3 rounded-lg shadow-2xl">
            <div>
              <h3 className=" text-center text-2xl">{thongTinPhim.tenPhim}</h3>
              <div className="flex justify-center">
                <img
                  style={{ width: "400px" }}
                  src={thongTinPhim.hinhAnh}
                  alt=""
                />
              </div>
            </div>
            <hr />
            <div className="flex justify-between my-3">
              <div className="font-bold">Tên cụm rạp: </div>
              <div className="text-md-right">{thongTinPhim.tenCumRap}</div>
            </div>
            <div className="flex justify-between my-3">
              <div className="font-bold">Địa chỉ: </div>
              <div className="text-md-right">{thongTinPhim.diaChi}</div>
            </div>
            <div className="flex justify-between my-3">
              <div className="font-bold">Thời gian: </div>
              <div className="text-md-right">
                {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
              </div>
            </div>
            <div className="flex justify-between my-3">
              <div className="font-bold">Rạp: </div>
              <div className="text-md-right">{thongTinPhim.tenRap}</div>
            </div>

            <hr />
            <div className="">
              <div className="">
                <h3 className="text-red-400 text-center">Ghế đã chọn</h3>

                <div className="grid grid-cols-6">
                  {_.sortBy(bookingChairList, ["stt"]).map((item, index) => {
                    return (
                      <Fragment>
                        <button
                          key={index}
                          style={{
                            height: "30px",
                            width: "50px",
                            borderRadius: "10px",
                          }}
                          className="col-span-1 mb-3 bg-emerald-600 border-none text-white text-sm mx-1"
                        >
                          {item.stt}
                        </button>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-between my-10">
              <div className=" text-2xl">Tổng tiền: </div>
              <div className=" text-2xl">
                {bookingChairList
                  .reduce((totalPrice, chair, index) => {
                    return (totalPrice += chair.giaVe);
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </div>
            </div>
            <Button
              onClick={() => {
                const bookingInfo = new BookingInfo();
                bookingInfo.maLichChieu = props.match.params.id;
                bookingInfo.danhSachVe = bookingChairList;
                dispatch(bookingTicketAction(bookingInfo));
              }}
              type="primary"
              danger
              className="w-full"
            >
              Đặt vé
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingComplete = () => {
  const dispatch = useDispatch();
  const { bookingHistory, profile } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(bookingHistoryAction);
  }, []);

  return (
    <div className="text-center">
      <h2>Lịch sử đặt vé</h2>
      <p>
        Hãy kiểm tra thông tin phim và rạp chiếu trước khi xem phim bạn nhé!
      </p>
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
                  <p>Ngày chiếu: {moment(item.ngayDat).format("DD.MM.YYYY")}</p>
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
  );
};

const CheckOut = (props) => {
  const dispatch = useDispatch();
  const tabActive = useSelector((state) => state.movie.tabActive);
  const onChange = (key) => {
    dispatch({
      type: actionsType.TAB_CHANGE_ACTIVE,
      payload: key,
    });
  };
  const { profile } = useSelector((state) => state.user);

  const operations = (
    <Fragment>
      {!_.isEmpty(profile) ? (
        <div>
          <HomeOutlined
            onClick={() => {
              history.push("/");
            }}
            className=""
          />{" "}
          <span>
            <Button
              onClick={() => {
                history.push("/profile");
              }}
              shape="circle"
            >
              <UserOutlined />
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem(ENV.USER_PROFILE);
                history.push("/");
                window.location.reload();
              }}
              shape="circle"
            >
              <LogoutOutlined />
            </Button>
          </span>
        </div>
      ) : (
        ""
      )}{" "}
    </Fragment>
  );

  const items = [
    {
      key: "1",
      label: (
        <div>
          SEAT SELECTION & PAYMENT <ArrowRightOutlined className="ml-8" />
        </div>
      ),
      children: <SeatSelection {...props} />,
    },
    {
      key: "2",
      label: <div>BOOKING COMPLETE </div>,
      children: <BookingComplete {...props} />,
    },
  ];

  return (
    <div className="container mx-auto">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default CheckOut;
