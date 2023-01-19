import { ENV } from "../util/settings/config";
import { BookingInfo } from "../_core/models/BookingInfo";
import { baseService } from "./baseService";

export class MovieService extends baseService {
  constructor() {
    super();
  }

  getBannerList = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  getMovieByPage = (page) => {
    return this.getPage(`/api/QuanLyPhim/LayDanhSachPhimPhanTrang`, page);
  };

  getCinamaSystem = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  getScheduleMovieCinema = (maHeThongRap) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${ENV.REACT_APP_GROUP_CODE}`
    );
  };

  getMovieDetail = (movieId) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?maPhim=${movieId}`
    );
  };

  getTheaterDetail = (showTimeId) => {
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimeId}`
    );
  };

  postBookingTicket = (bookingInfo = new BookingInfo()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, bookingInfo);
  };
}

export const movieService = new MovieService();
