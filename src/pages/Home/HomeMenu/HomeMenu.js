import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import { useSelector } from "react-redux";
import { getScheduleMovieCinemaAction } from "../../../redux/actions/MoviesAction";
import "./homeMenu.css";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";
import { summaryText } from "../../../util/settings/generalSetting";

const HomeMenu = (props) => {
  const [listSchedule, setListSchedule] = useState([]);

  const cinemas = useSelector((state) => state.movie.cinemaSystem);

  useEffect(() => {
    getScheduleMovieCinemaAction(cinemas[0]?.maHeThongRap).then((res) =>
      setListSchedule(res.data.content)
    );
  }, [cinemas]);

  return (
    <div className="homeMenu my-10 flex justify-center">
      <Tabs
        style={{
          minWidth: "960px",
        }}
        className="shadow-xl"
        tabPosition={"left"}
        onChange={(key) => {
          getScheduleMovieCinemaAction(key).then((res) => {
            setListSchedule(res.data.content);
          });
        }}
        items={cinemas.map((itemRap) => {
          return {
            label: (
              <div
                style={{
                  width: "55px",
                }}
                className="border-2"
              >
                <img className="w-16" src={itemRap.logo} alt="123" />
              </div>
            ),
            key: itemRap.maHeThongRap,
            children: listSchedule.length > 0 && (
              <Tabs
                centered={true}
                tabPosition={"left"}
                items={listSchedule[0].lstCumRap
                  ?.slice(0, 5)
                  .map((itemCumRap, index) => {
                    return {
                      label: (
                        <div
                          style={{ width: "264px" }}
                          className="abc text-left"
                        >
                          <h4> {summaryText(itemCumRap.tenCumRap, 0, 30)}</h4>
                          <p>{summaryText(itemCumRap.diaChi, 0, 35)}</p>
                        </div>
                      ),
                      key: index,
                      children: itemCumRap.danhSachPhim
                        .slice(0, 4)
                        .map((movie, index) => {
                          return (
                            <Fragment key={index}>
                              <div className="grid grid-cols-12 mb-5">
                                <div className="col-span-3">
                                  <img
                                    style={{
                                      height: "200px",
                                      width: "150px",
                                    }}
                                    src={movie.hinhAnh}
                                    alt={movie.tenPhim}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://picsum.photos/75/75";
                                    }}
                                  />
                                </div>
                                <div className="col-start-4 col-span-9 ml-5">
                                  <h1 className="text-2xl text-green-700">
                                    {movie.tenPhim}
                                  </h1>
                                  <div className="grid grid-cols-12">
                                    {movie.lstLichChieuTheoPhim
                                      ?.slice(0, 6)
                                      .map((showTime, index) => {
                                        return (
                                          <div className="col-span-6 mb-1">
                                            <NavLink
                                              to={`/checkout/${showTime.maLichChieu}`}
                                              key={index}
                                            >
                                              <Button
                                                className="text-sm "
                                                type="primary"
                                                danger
                                              >
                                                {moment(
                                                  showTime.ngayChieuGioChieu
                                                ).format("hh:mm A")}
                                                {" ~ "}
                                                {moment(
                                                  showTime.ngayChieuGioChieu
                                                ).format("DD/MM/YYYY")}
                                              </Button>
                                            </NavLink>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        }),
                    };
                  })}
              />
            ),
          };
        })}
      />
    </div>
  );
};

export default HomeMenu;
