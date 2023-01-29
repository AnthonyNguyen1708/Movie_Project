import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import { useSelector } from "react-redux";
import { getScheduleMovieCinemaAction } from "../../../redux/actions/MoviesAction";

import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";

const HomeMenu = (props) => {
  const [listSchedule, setListSchedule] = useState([]);

  const cinemas = useSelector((state) => state.movie.cinemaSystem);

  useEffect(() => {
    getScheduleMovieCinemaAction(cinemas[0]?.maHeThongRap).then((res) =>
      setListSchedule(res.data.content)
    );
  }, [cinemas]);
  return (
    <div className="my-10 flex justify-center">
      <Tabs
        className="w-4/5 shadow-xl"
        tabPosition={"left"}
        onChange={(key) => {
          getScheduleMovieCinemaAction(key).then((res) => {
            setListSchedule(res.data.content);
          });
        }}
        items={cinemas.map((itemRap) => {
          return {
            label: (
              <div className="border-2">
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
                        <div className="text-left w-80">
                          <h4>{itemCumRap.tenCumRap.substr(0, 50) + "..."}</h4>
                          <p>{itemCumRap.diaChi.substr(0, 50) + "..."}</p>
                        </div>
                      ),
                      key: index,
                      children: itemCumRap.danhSachPhim
                        .slice(0, 4)
                        .map((movie, index) => {
                          return (
                            <Fragment key={index}>
                              <div>
                                <div className="flex justify-start mb-5">
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
                                  <div className="ml-4">
                                    <h1 className="text-2xl text-green-700">
                                      {movie.tenPhim}
                                    </h1>
                                    <div className="grid grid-cols-1 gap-2">
                                      {movie.lstLichChieuTheoPhim
                                        ?.slice(0, 3)
                                        .map((showTime, index) => {
                                          return (
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
                                          );
                                        })}
                                    </div>
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
