import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCinemaSystemAction,
  getMoviesAction,
} from "../../redux/actions/MoviesAction";
import HomeMenu from "./HomeMenu/HomeMenu";
import { Col, Row, Card, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import HomeCarousel from "../../template/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { summaryText } from "../../util/settings/generalSetting";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMoviesAction());
    dispatch(getCinemaSystemAction);
  }, []);

  const movies = useSelector((state) => state.movie.movieList);

  return (
    <div>
      <HomeCarousel />

      <div className="container mx-auto ">
        <div className="container mx-auto mb-10">
          <h1 className="text-center text-5xl font-normal">Danh sách phim</h1>
          <Row gutter={30}>
            {movies.items?.map((item) => (
              <Col
                className="mb-7"
                key={item.maPhim}
                xs={24}
                sm={24}
                md={12}
                lg={6}
              >
                <Card
                  className="movie_item"
                  hoverable
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  cover={
                    <img
                      className="movie_img h-72 object-cover object-left-top"
                      alt="example"
                      src={item.hinhAnh}
                    />
                  }
                >
                  <h1 className=" text-2xl text-center my-2 font-semibold h-20">
                    {summaryText(item.tenPhim, 0, 20)}
                  </h1>
                  <p className="text-lg my-2 h-36">
                    {summaryText(item.moTa, 0, 100)}
                  </p>
                  <Link to={`/detail/${item.maPhim}`}>
                    <Button className="w-full" type="primary" size="large">
                      Đặt vé
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center">
            {movies.items && (
              <Pagination
                defaultCurrent={movies.currentPage}
                total={movies.totalCount}
                pageSize={4}
                onChange={(page) => {
                  dispatch(getMoviesAction(page));
                }}
              />
            )}
          </div>
        </div>

        <HomeMenu />
      </div>
    </div>
  );
}
