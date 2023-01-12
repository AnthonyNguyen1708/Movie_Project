import { Button } from "antd";
import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheaterDetailAction } from "../../redux/actions/MoviesAction";
import style from "./CheckOut.css";
import { CloseOutlined } from "@ant-design/icons";
import actionsType from "../../redux/actions/types/ActionsType";

const CheckOut = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const theaterDetail = useSelector((state) => state.movie.theaterDetail);
  const { thongTinPhim, danhSachGhe } = theaterDetail;

  useEffect(() => {
    dispatch(getTheaterDetailAction(props.match.params.id));
  }, []);

  const handleClick = (value) => {
    console.log(value);
  };

  const renderSeats = () => {
    return danhSachGhe.map((chair, index) => {
      let vipChair = chair.loaiGhe === "Vip" ? "gheVip" : "";
      let bookedChair = chair.loaiGhe === true ? "gheDaDat" : "";
      return (
        <Fragment key={index}>
          {
            <button
              onClick={(chair) => {
                console.log("chair: ", chair);
                // dispatch({
                //   type: actionsType.SET_BOOKED_CHAIR,
                //   payload: chair,
                // });
              }}
              disabled={chair.daDat}
              className={`ghe ${vipChair} ${bookedChair}`}
            >
              {chair.daDat ? (
                <CloseOutlined
                  style={{ marginBottom: 7.5, fontWeight: "bold" }}
                />
              ) : (
                chair.stt
              )}
            </button>
          }
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div>
            <div className="mx-auto">
              <img
                clas
                style={{
                  width: "90%",
                }}
                src="https://movie-booking-project.vercel.app/img/bookticket/screen.png"
                alt=""
              />
            </div>
            <div>{renderSeats()}</div>
          </div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl">0 VND</h3>
          <hr />
          <h3 className="text-green-400 text-center text-xl">
            {thongTinPhim.tenPhim}
          </h3>
          <p>
            Place: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
          </p>
          <p>
            Date: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div className="grid grid-cols-2 my-5">
            <div className="text-red-400">GHE</div>
            <div className="text-green-400 text-right">0 VND</div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i> <br /> {user.email}
          </div>
          <div className="my-5">
            <i>Phone</i> <br /> {user.soDT}
          </div>
          <hr />
          <Button type="primary" className="w-full">
            Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
