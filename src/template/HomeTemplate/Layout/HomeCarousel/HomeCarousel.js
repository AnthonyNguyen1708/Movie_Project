import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function HomeCarousel(props) {
  const bannerList = useSelector((state) => state.CarouselReducer.bannerList);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1NzIxMzIwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.uVmhasF9oy0mXFYvSl8tBIUY7ZRmZ-U0hLsBB75mkn8",
        },
      });
      console.log(res);
      dispatch({
        type: "SET_BANNER",
        payload: res.data.content,
      });
    } catch (error) {}
  }, []);
  return (
    <Carousel effect="fade">
      {bannerList.map((item) => {
        return (
          <div key={item.maBanner}>
            <h3>
              <div className="w-full h-[70vh]">
                <img
                  className="w-full h-full bg-contain bg-center"
                  src={item.hinhAnh}
                  alt=""
                />
              </div>
            </h3>
          </div>
        );
      })}
    </Carousel>
  );
}
