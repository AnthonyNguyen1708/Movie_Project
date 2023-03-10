import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBannersAction } from "../../../../redux/actions/MoviesAction";

export default function HomeCarousel(props) {
  const bannerList = useSelector((state) => state.movie.bannerList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannersAction);
  }, []);

  return (
    <Carousel effect="fade">
      {bannerList.map((item) => {
        return (
          <div className="w-full" key={item.maBanner}>
            <div className="w-full h-[80vh]">
              <img
                className="w-full h-full bg-contain bg-center"
                src={item.hinhAnh}
                alt=""
              />
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
