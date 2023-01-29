import { Button, Image, Modal, Rate, Tabs } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../../assets/styles/circle.css";
import { getMovieDetailAction } from "../../redux/actions/MoviesAction";

const Detail = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    var iframe = document.querySelector("#video-trailer");

    if (iframe !== null) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }

    setOpenModal(false);
  };
  const movieDetail = useSelector((state) => state.movie.movieDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(getMovieDetailAction(id));
  }, []);
  return (
    <div
      style={{
        height: "80vh",
        backgroundColor: "rgb(10, 32, 41)",
      }}
      className=" h-full pt-5 "
    >
      <div className="container mx-auto grid grid-cols-12">
        <div className="col-span-4 col-start-4">
          <div className="grid grid-cols-2">
            <Image
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
              <Button
                className="mr-3"
                type="primary"
                size="large"
                onClick={() => showModal()}
              >
                Xem trailer
              </Button>
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

      <div className="mt-20 container mx-auto ">
        <Tabs
          style={{
            width: "50%",
            height: "300px",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "10px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
          className="text-white mx-auto "
          tabPosition={"left"}
          items={movieDetail.heThongRapChieu?.map((item, index) => {
            return {
              label: (
                <div className="">
                  <img width={50} height={50} src={item.logo} alt="" />
                </div>
              ),
              key: index,
              children: item.cumRapChieu?.map((cinema, index) => {
                return (
                  <div className="ml-5" key={index}>
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
      <Modal
        title="Trailer"
        footer={[]}
        open={openModal}
        onCancel={closeModal}
        width={800}
      >
        {/* nội dung modal */}
        <iframe
          id="video-trailer"
          width="100%"
          height="500px"
          src={movieDetail.trailer}
        ></iframe>
        {/* https://www.youtube.com/watch?v=KSFS0OfIK2c */}
      </Modal>
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
