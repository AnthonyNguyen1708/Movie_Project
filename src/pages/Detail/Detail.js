import { Rate, Tabs } from "antd";
import moment from "moment/moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../assets/styles/circle.css";
import { getMovieDetailAction } from "../../redux/actions/MoviesAction";

const Detail = (props) => {
  const movieDetail = useSelector((state) => state.movie.movieDetail);
  console.log("movieDetail: ", movieDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(getMovieDetailAction(id));
  }, []);
  return (
    <div
      style={{
        height: "70vh",
        backgroundColor: "rgb(10, 32, 41)",
      }}
      className=" h-full pt-5 "
    >
      <div className="container mx-auto grid grid-cols-12">
        <div className="col-span-4 col-start-4">
          <div className="grid grid-cols-2">
            <img
              style={{
                height: 350,
                width: 200,
              }}
              src={movieDetail.hinhAnh}
              alt=""
            />
            <div className="text-white my-auto">
              <p className="text-sm">
                Ngày khởi chiếu:{" "}
                {moment(movieDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
              </p>
              <p>{movieDetail.tenPhim}</p>
              <p>Mô tả: {movieDetail.moTa}</p>
            </div>
          </div>
        </div>

        <div className="col-span-4 my-auto mx-auto text-center">
          <h1 className="text-white">Rating</h1>
          <div className="pl-8">
            <div className={`c100 p${movieDetail.danhGia * 10} big`}>
              <span>{movieDetail.danhGia + "/10"}</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
          </div>
          <Rate
            allowHalf
            className=""
            value={movieDetail.danhGia / 2}
            count={5}
          />
        </div>
      </div>

      <div className="mt-5 container mx-auto ">
        <Tabs
          style={{
            width: "50%",
            height: "500px",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="text-white mx-auto "
          tabPosition={"left"}
          items={movieDetail.heThongRapChieu?.map((item, index) => {
            return {
              label: (
                <div>
                  <img width={50} height={50} src={item.logo} alt="" />
                </div>
              ),
              key: index,
              children: item.cumRapChieu?.map((cinema, index) => {
                return (
                  <div key={index}>
                    <p className="text-black">{cinema.tenCumRap}</p>
                    <div className="grid grid-cols-6">
                      {cinema.lichChieuPhim?.map((showTime, index) => {
                        return (
                          <NavLink
                            to={`/checkout/${showTime.maLichChieu}`}
                            key={index}
                            className="col-span-1 text-green-800 font-bold"
                          >
                            {moment(showTime.ngayChieuGioChieu).format(
                              "hh:mm A"
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                );
              }),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Detail;

// {new Array(3).fill(null).map((_, i) => {
//     const id = String(i + 1);
//     return {
//       label: `Tab ${id}`,
//       key: id,
//       children: `Content of Tab ${id}`,
//     };
//   })}
