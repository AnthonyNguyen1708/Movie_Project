import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
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
    <>
      <Tabs
        tabPosition={"left"}
        onChange={(key) => {
          getScheduleMovieCinemaAction(key).then((res) => {
            setListSchedule(res.data.content);
          });
        }}
        items={cinemas.map((itemRap) => {
          return {
            label: <img className="w-24" src={itemRap.logo} alt="123" />,
            key: itemRap.maHeThongRap,
            children: listSchedule.length > 0 && (
              <Tabs
                tabPosition={"left"}
                items={listSchedule[0].lstCumRap.map((itemCumRap, index) => {
                  return {
                    label: (
                      <div className="text-left">
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
                            <div className="my-5">
                              <div style={{ display: "flex" }}>
                                <img
                                  style={{
                                    height: "150px",
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
                                <div className="ml-2">
                                  <h1 className="text-2xl text-green-700">
                                    {movie.tenPhim}
                                  </h1>
                                  <div className="grid grid-cols-6 gap-5">
                                    {movie.lstLichChieuTheoPhim
                                      ?.slice(0, 12)
                                      .map((showTime, index) => {
                                        return (
                                          <NavLink
                                            className="text-2xl text-yellow-400"
                                            to="/"
                                            key={index}
                                          >
                                            {moment(
                                              showTime.ngayChieuGioChieu
                                            ).format("hh:mm A")}
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
    </>
  );
};

export default HomeMenu;
